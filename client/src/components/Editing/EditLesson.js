import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axiosClient from "../../axiosDefaults";
import qs from "qs";
import { _moveArrayIndex, _getListEndsState } from "../../utils/arrays";

import Loader from "../Loader";
import TaskForm from "./TaskForm";
import FormSubmitButton from "../FormComponents/FormSubmitButton";

// TODO: where best to store new lesson template?
const NEW_LESSON = {
    name: "",
    id: "new",
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
        lessonCopy.id = `lesson-${lessonCopy.name}`;
        console.log("submitting: ", lessonCopy);
        axiosClient.post(`/api/v1/lessons/${String(id)}`, qs.stringify(lesson))
            .then(res => { setSubmitSuccess(true); })
            .catch(err => { setErrors(err.response.data); })
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
     * @name addNewAnswer
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
        console.log(`id ${taskID} old index: ${oldIndex} len: ${tasksCopy.length}`)
        if (oldIndex < tasksCopy.length) _moveArrayIndex(tasksCopy, oldIndex, oldIndex + 1);
        let updatedLesson = {...lesson, tasks: tasksCopy};
        setLesson(updatedLesson);
    }

    if (!ready) return <Loader />;
    return(
        <>
            <div className={`w-screen h-screen flex justify-center items-center
                z-10 absolute top-0 left-0
                ${showSubmitConfirm && !submitSuccess ? "" : "hidden"}    
            `}>
                <div className="opacity-50 w-screen h-screen bg-green-500 absolute">
                </div>
                <div className="opacity-100 z-20 flex justify-between w-5/12 items-center">
                    Are you sure?
                    <div>
                        <button
                            className="capitalize h-10 bg-blue-500 rounded text-white px-4"
                            onClick={() => { saveLesson() }}
                        >
                            Yes
                        </button>
                        <button
                            className="capitalize h-10 bg-red-500 rounded text-white px-4"
                            onClick={() => { setShowSubmitConfirm(false) }}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
            <div className="edit-lesson container mx-auto pt-5
                    flex justify-center pt-10 mb-10">
                <form 
                    className="edit-lesson-form w-8/12" 
                    noValidate 
                    onSubmit={ onSubmit }
                >
                    <h1 className="text-xl font-bold" >
                        Edit Lesson {lesson.name}
                    </h1>
                    <div className="input-field my-4 flex flex-col">
                        <div 
                            htmlFor="name"
                            style={{textTransform: "capitalize"}}
                            className=""
                        >
                            Name:
                        </div>
                        <input
                            onChange={onChange}
                            value={lesson.name}
                            placeholder={"Lesson Name"}
                            id="name"
                            error={errors.name}
                            className="rounded border-2 border-black px-1 
                                py-0.5 w-5/12 my-1"
                        />
                    </div>

                    <div className="input-field my-4 flex flex-col">
                        <label 
                            htmlFor="requiredCompletions"
                            style={{textTransform: "capitalize"}}
                        >
                            Required Completions:
                        </label>
                        <input
                            className="rounded border-2 border-black px-1 
                                py-0.5 w-5/12 my-1"
                            onChange={onChange}
                            value={lesson.requiredCompletions}
                            error={errors.requiredCompletions}
                            id="requiredCompletions"
                            type="number"
                        />
                    </div>

                    <div className="input-field my-4 flex items-center">
                        <label 
                            htmlFor="shuffle"
                            style={{textTransform: "capitalize"}}
                        >
                            Shuffle Tasks:
                        </label>
                        <input
                            className="rounded border-2 border-black w-6 h-6 
                                px-1 py-0.5 mx-3"
                            onChange={onChange}
                            checked={lesson.shuffle}
                            error={errors.shuffle}
                            id="shuffle"
                            type="checkbox"
                        />
                    </div>

                    <div className="mt-8">
                        <h1 className="text-xl font-bold" >
                            Tasks:
                        </h1>
                        {lesson.tasks.map((task, index) => (
                            <TaskForm 
                                task = {task}
                                key = {task.taskID}
                                shuffle = {lesson.shuffle}
                                index = {index}
                                listEndsState = {_getListEndsState(index, lesson.tasks)}
                                onTasksChange = {onTasksChange} 
                                shiftTaskDown = {shiftTaskDown}
                                shiftTaskUp = {shiftTaskUp}
                            />
                        ))}
                        <div
                            className="flex flex-col justify-evenly items-center
                                rounded border-2 border-black p-4 first:my-4 my-8
                                group hover:bg-blue-400 hover:text-white 
                                hover:border-blue-400 transition-all
                                w-32 h-32 mx-auto"
                            onClick={() => {
                                addNewTask();
                            }}
                        >
                            Add new task
                            <div 
                                className="text-3xl text-blue-400
                                    group-hover:text-white transition-all"
                            >+</div>
                        </div>
                    </div>

                    <FormSubmitButton dataElem="edit-lesson" text={"Submit Lesson"} />
                </form>
            </div>
        </>
    )
}

export default EditLesson;