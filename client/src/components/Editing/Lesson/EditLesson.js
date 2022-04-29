import React, { useState, useEffect } from "react";
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

import { useBeforeunload } from 'react-beforeunload';

import Loader from "../../Loader";
import EditTask from "../Task/EditTask";
import FormSubmitButton from "../../FormComponents/FormSubmitButton";
import FormTitle from "../../FormComponents/FormTitle";
import ConfirmationPrompt from "../ConfirmationPrompt";
import FormInput from "../../FormComponents/FormInput";
import AddButton from "../../FormComponents/AddButton";
import FormError from "../../FormComponents/FormError";

// TODO: where best to store new lesson template?
const NEW_LESSON = {
    name: "",
    strId: "new",
    requiredCompletions: 1,
    shuffle: false,
    tasks: []
}

function EditLesson(props) {
    let { id } = useParams();
    
    let [lesson, setLesson] = useState();
    let [ready, setReady] = useState(false);
    let [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
    let [submitSuccess, setSubmitSuccess] = useState(false);
    let [errors, setErrors] = useState({});
    
    // alert prompt if user tries to leave without saving
    useBeforeunload((e) => { if ("value" !== '') e.preventDefault(); });
    
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
    // TODO: improve removal of properties in possible answers of spec order etc.
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
    let saveLesson = () => {
        let lessonCopy = {...lesson};
        lessonCopy = removeUnnecessaryTaskProperties(lesson);
        lessonCopy.strId = `lesson-${lessonCopy.name}`;
        console.log("submitting: ", lessonCopy);
        let validationErrors = _getLessonValidationErrors(lessonCopy);
        setErrors(validationErrors);
        console.log(validationErrors);
        if (!_isObjectEmpty(validationErrors)) return setShowSubmitConfirm(false);
        axiosClient.post(`/api/v1/lessons/${String(lessonCopy.strId)}`, qs.stringify(lesson))
            .then(res => { 
                setSubmitSuccess(true);
            })
            .catch(err => { 
                setErrors(err.response.data); 
            })
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
            if (task.taskID === updatedTask.taskID) {
                targetIndex = i;
            }
        });
        tasksCopy[targetIndex] = updatedTask;
        let updatedLesson = {...lesson, tasks: tasksCopy}
        setLesson(updatedLesson);
    }

    /** Adds new task to the current lesson
     * @name addNewTask
     */
    let addNewTask = () => {
        let tasksCopy = lesson.tasks;
        tasksCopy.push({
            taskID: String(tasksCopy.length + 1),
            text: "",
            type: "TextOnly",
        })
        let updatedLesson = {...lesson, tasks: tasksCopy}
        setLesson(updatedLesson);
        scrollToBottom();
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

    // TODO: fix 
    /** should scroll the window to the bottom of the page - BROKEN
     * @name scrollToBottom
     */
    let scrollToBottom = () => {
        let container = document.getElementById("custom-container");
        container.scrollTop = container.scrollHeight;
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
        if (oldIndex < tasksCopy.length) _moveArrayIndex(tasksCopy, oldIndex, oldIndex + 1);
        let updatedLesson = {...lesson, tasks: tasksCopy};
        setLesson(updatedLesson);
    }

    if (!ready) return <Loader />;
    return(
        <>
            <ConfirmationPrompt 
                showSubmitConfirm={showSubmitConfirm}
                setShowSubmitConfirm={setShowSubmitConfirm}
                submitSuccess={submitSuccess}
                saveLesson={saveLesson}
            />
            <Link className="absolute p-2 text-sm text-primary" to="/edit/overview" replace>
                &lt; back to overview
            </Link>
            <div className="w-screen mx-auto
                    flex justify-center pt-10 mb-10">
                <form 
                    className="edit-lesson-form w-8/12" 
                    id="edit-lesson"
                    noValidate 
                    onSubmit={onSubmit}
                >
                    <FormTitle text={`Edit Lesson ${lesson.name}`} />
                    <FormInput
                        for="name" 
                        onChange={onChange}
                        placeholder={"Lesson Name"}
                        value={lesson.name}
                        type="text"
                        errors={errors}
                    />
                    <FormInput
                        for="requiredCompletions" 
                        onChange={onChange}
                        value={lesson.requiredCompletions}
                        type="number" 
                        errors={errors}
                    /> 
                    <FormInput
                        for="shuffle" 
                        onChange={onChange}
                        value={lesson.shuffle}
                        type="checkbox"
                        row={true}
                        errors={errors}
                    /> 
                    <div className="mt-8">
                        <FormTitle text="Tasks: " />
                        {lesson.tasks.map((task, index) => (
                            <EditTask 
                                task = {task}
                                key = {task.taskID}
                                shuffle = {lesson.shuffle}
                                index = {index}
                                listEndsState = {_getListEndsState(index, lesson.tasks)}
                                onTasksChange = {onTasksChange} 
                                shiftTaskDown = {shiftTaskDown}
                                shiftTaskUp = {shiftTaskUp}
                                errors = {errors}
                                deleteTask = {deleteTask}
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
                    <FormSubmitButton for="edit-lesson" text="Submit Lesson" />
                </form>
            </div>
        </>
    )
}

export default EditLesson;