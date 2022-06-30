import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

import axiosClient from "../../../axiosDefaults";
import qs from "qs";
import { 
    _moveArrayIndex, 
    _getListEndsState 
} from "../../../utils/arrays";
import { 
    _getLessonValidationErrors, 
    _isObjectEmpty 
} from "../../../utils/validation/validateLesson";

import Loader from "../../Loader";
import EditTask from "../Task/EditTask";
import FormSubmitButton from "../../FormComponents/FormSubmitButton";
import FormTitle from "../../FormComponents/FormTitle";
import ConfirmationPrompt from "../ConfirmationPrompt";
import FormInput from "../../FormComponents/FormInput";
import AddButton from "../../FormComponents/AddButton";
import FormError from "../../FormComponents/FormError";
import PopInModal from "../PopInModal";

// TODO: where best to store new lesson template?
const NEW_LESSON = {
    name: "",
    id: "new",
    requiredCompletions: 1,
    shuffle: false,
    showInterstitials: true,
    showPercentCorrect: true,
    noToSample: 0,
    tasks: []
}

function EditLesson(props) {
    let { id } = useParams();
    
    let [lesson, setLesson] = useState();
    let [ready, setReady] = useState(false);
    let [saving, setSaving] = useState(false);
    let [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
    let [submitSuccess, setSubmitSuccess] = useState(false);
    let [showSuccessModal, setShowSuccessModal] = useState(false);
    let [errors, setErrors] = useState({});

    const handleUnload = useCallback((e) => {
        e.preventDefault();
    }, [submitSuccess]);

    // alert prompt if user tries to leave without saving
    useEffect(() => {
        window.addEventListener("beforeunload", handleUnload);
        return () => { window.removeEventListener("beforeunload", handleUnload)};
    }, []);

    useEffect(() => { 
        document.title = `Learn Punjabi - Edit ${String(id)}`
    }, []);
    
    // when lesson ID is updated, get/create and lesson data from server
    useEffect(() => {
        if (id === "new") {
            setLesson(NEW_LESSON);
            setReady(true);
        } else {
            axiosClient.get(`/api/v1/lessons/${String(id)}`)
                .then(res => {
                    setLesson(res.data);
                    setReady(true);
                })
                .catch(err => { console.log("Get lesson error: ", err); })
        }
    }, [id]);

    /**
     * strips each task in the lesson of all the unnecessary
     * @name removeUnnecessaryTaskProperties
     * @param {Object} lesson
     * @returns {Object} lesson with only the properties relevant to its tasks
     */
    let removeUnnecessaryTaskProperties = (lesson) => {
        lesson.tasks.forEach(task => {
            // delete unneeded properties
            switch (task.type) {
                case "TextOnly":
                    delete task.correctAnswer;
                    delete task.correctAnswerIndex;
                    break;
                case "MultipleChoice":
                    delete task.correctAnswer;
                    break;
                case "SpecificOrder":
                    delete task.correctAnswerIndex;
                    break;
                default:
                    break;
            }
        });
        return lesson;
    }

    /** On form submit, show the confirmation modal
     * @name onSubmit
     * @param {Object} e - submit event
    */
    let onSubmit = e => {
        e.preventDefault();
        setShowSubmitConfirm(true);
    }

    /** If user has confirmed intention to save, post current form state to server
     * @name saveLesson
     */
    let saveLesson = async () => {
        try {
            setSaving(true);
            // copy object
            let lessonCopy = {...lesson};
            lessonCopy = removeUnnecessaryTaskProperties(lesson);
            // assign id if necessary
            if (!lessonCopy.id || lessonCopy.id === "new") 
                lessonCopy.id = `lesson-${lessonCopy.name}`;
            // validate
            let validationErrors = _getLessonValidationErrors(lessonCopy);
            setErrors(validationErrors);
            if (!_isObjectEmpty(validationErrors)) {
                setSaving(false);
                setShowSubmitConfirm(false);
                return;
            }
            // build audio file upload promises
            const fileUploads = [];
            lessonCopy.tasks.forEach(task => {
                if (!task.audio || task.audio?.name === "") return;
                task.audioFilename = task.audio.name;
                const fileData = new FormData();
                fileData.append('file', task.audio);
                const options = { 
                    headers: { 'Content-Type': 'multipart/form-data' },
                    timeout: 30 * 1000,
                }
                fileUploads.push(
                    axiosClient.post(`/api/v1/s3/upload`, fileData, options)
                );
            })
            // send api request to save lesson data
            await axiosClient.post(`/api/v1/lessons/${String(lessonCopy.id)}`, 
                qs.stringify(lessonCopy));
            // send upload requests for files
            await Promise.all(fileUploads);
            // handle success
            setSaving(false);
            setSubmitSuccess(true);
            setShowSuccessModal(true);
        } catch (error) {
            setSaving(false);
            setShowSubmitConfirm(false);
            setErrors(error.response.data);
        }
    }

    /** updates form state on change of form field value
     * @name onChange
     * @param {Object} e - change event
    */
    let onChange = e => {
        let lessonCopy = {...lesson};
        const target = e.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        lessonCopy[target.id] = value;
        setLesson(lessonCopy);
    }

    /** ensures that any changes to a task object are reflected 
     * fully in the lesson state, i.e. ensures deep copy
     * @name onTasksChange
     * @param {Object} updatedTask
    */
    let onTasksChange = updatedTask => {
        let tasksCopy = lesson.tasks;
        let targetIndex;
        tasksCopy.forEach((task, i) => {
            if (task.taskID === updatedTask.taskID) targetIndex = i;
        });
        tasksCopy[targetIndex] = updatedTask;
        let updatedLesson = {...lesson, tasks: tasksCopy}
        setLesson(updatedLesson);
    }

    /** Adds new task to the current lesson
     * @name addNewTask
     */
    let addNewTask = () => {
        const tasksCopy = lesson.tasks;
        tasksCopy.push({
            taskID: String(tasksCopy.length + 1),
            text: "",
            type: "TextOnly",
            audioFilename: "",
            audio: {name: ""},
            audioTranscript: "",
        })
        let updatedLesson = {...lesson, tasks: tasksCopy}
        setLesson(updatedLesson);
    }

    /** Deletes task from lesson
     * @name deleteTask
     * @param {String} taskID - id of task to delete
     */
    let deleteTask = (taskID) => {
        let newTasks = lesson.tasks.filter(item => item.taskID !== taskID);
        let updatedLesson = {...lesson, tasks: newTasks}
        setLesson(updatedLesson);
    }

    /** Moves a specific task back in the lesson order
     * @name shiftTaskUp
     * @param {String} taskID
     */
    let shiftTaskUp = (taskID) => {
        let tasksCopy = lesson.tasks;
        let oldIndex = tasksCopy.findIndex(elem => elem.taskID === taskID);
        if (oldIndex > 0) _moveArrayIndex(tasksCopy, oldIndex, oldIndex - 1);
        let updatedLesson = {...lesson, tasks: tasksCopy};
        setLesson(updatedLesson);
    }

    /** Moves a specific task forward in the lesson order
     * @name shiftTaskUp
     * @param {String} taskID
     */
    let shiftTaskDown = (taskID) => {
        let tasksCopy = lesson.tasks;
        let oldIndex = tasksCopy.findIndex(elem => elem?.taskID === taskID);
        if (oldIndex < tasksCopy.length) 
            _moveArrayIndex(tasksCopy, oldIndex, oldIndex + 1);
        let updatedLesson = {...lesson, tasks: tasksCopy};
        setLesson(updatedLesson);
    }

    if (!ready) return <Loader />;
    return(
        <>
            <PopInModal 
                show={showSuccessModal} 
                length={5000} 
                unrender={() => { setShowSuccessModal(false); }}
                text="Lesson saved successfully!" 
            />
            <ConfirmationPrompt 
                showConfirmation={showSubmitConfirm}
                setShowConfirmation={setShowSubmitConfirm}
                submitSuccess={submitSuccess}
                handleYes={saveLesson}
                saving={saving}
            />
            <Link 
                className="absolute p-2 text-sm text-primary" 
                to="/edit" 
                replace
            >
                &lt; back to overview
            </Link>
            <main className="w-screen mx-auto
                    flex justify-center pt-10 mb-10">
                <h1 className="visually-hidden">Edit Lesson {lesson.name}</h1>
                <form 
                    className="edit-lesson-form w-8/12" 
                    id="edit-lesson"
                    noValidate 
                    onSubmit={onSubmit}
                >
                    <FormTitle text={`Edit Lesson ${lesson.name}`} />
                    <fieldset>
                        <legend className="visually-hidden">Lesson Info</legend>
                        <FormInput
                            for="name" 
                            required={true}
                            onChange={onChange}
                            placeholder={"Lesson Name"}
                            value={lesson.name}
                            type="text"
                            errors={errors}
                        />
                        <FormInput
                            for="requiredCompletions" 
                            required={true}
                            onChange={onChange}
                            value={lesson.requiredCompletions}
                            type="number" 
                            errors={errors}
                        /> 
                        <FormInput
                            for="shuffle" 
                            required={true}
                            onChange={onChange}
                            value={lesson.shuffle}
                            type="checkbox"
                            row={true}
                            errors={errors}
                        /> 
                        { lesson.shuffle ? 
                            <div aria-live="assertive">
                                <FormInput
                                    for="noToSample" 
                                    onChange={onChange}
                                    value={lesson.noToSample}
                                    type="number" 
                                    min={0}
                                    max={lesson.tasks.length}
                                    errors={errors}
                                />
                            </div> : null }
                        <FormInput
                            for="showInterstitials" 
                            required={true}
                            onChange={onChange}
                            value={lesson.showInterstitials}
                            type="checkbox"
                            row={true}
                            errors={errors}
                        /> 
                        <FormInput
                            for="showPercentCorrect" 
                            required={true}
                            onChange={onChange}
                            value={lesson.showPercentCorrect}
                            type="checkbox"
                            row={true}
                            errors={errors}
                        /> 
                    </fieldset>
                    <div className="mt-8">
                        <FormTitle text="Tasks: " />
                        {lesson.tasks.map((task, index) => (
                            <EditTask 
                                task={task}
                                key={task.taskID}
                                shuffle={lesson.shuffle}
                                index={index}
                                listEndsState={_getListEndsState(index, lesson.tasks)}
                                onTasksChange={onTasksChange} 
                                shiftTaskDown={shiftTaskDown}
                                shiftTaskUp={shiftTaskUp}
                                errors={errors}
                                deleteTask={deleteTask}
                            />
                        ))}
                    </div>
                    <AddButton 
                        addNew={addNewTask} 
                        text="Add new task" 
                        size="32" 
                        extraStyles="mx-auto"
                    />
                    <FormError for="tasks" errors={errors} />
                    <FormSubmitButton 
                        disabled={submitSuccess} 
                        for="edit-lesson" 
                        text="Submit Lesson" 
                    />
                </form>
            </main>
        </>
    )
}

export default EditLesson;