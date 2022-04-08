import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axiosClient from "../../axiosDefaults";

import Loader from "../Loader";
import TaskForm from "./TaskForm";
import FormSubmitButton from "../FormComponents/FormSubmitButton";

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

    let [successful, setSuccessful] = useState(false);
    let [errors, setErrors] = useState({});
    
    // when lesson ID is updated, get and save lesson data from server
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

    let onSubmit = e => {
        e.preventDefault();
        
        let lessonCopy = {...lesson};
        lessonCopy.tasks.forEach(task => {
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

        lessonCopy.id = `l-${lessonCopy.name}`

        console.log(lessonCopy);
        // axiosClient.post(`/api/v1/lessons/${String(id)}`, qs.stringify(lesson))
        //     .then(res => { setSuccessful(true); })
        //     .catch(err => { setErrors(err.response.data); })
    }

    let onChange = e => {
        let lessonCopy = {...lesson};
        const target = e.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        console.log(`${target.id} is ${value}`)
        lessonCopy[target.id] = value;
        setLesson(lessonCopy);
    }

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

    let addNewTask = () => {
        console.log("add new task called")
        let tasksCopy = lesson.tasks;
        tasksCopy.push({
            taskID: String(tasksCopy.length + 1),
            text: "",
            type: "TextOnly",
        })
        let updatedLesson = {...lesson, tasks: tasksCopy}
        console.log(updatedLesson)
        setLesson(updatedLesson);
        scrollToBottom();
    }

    // TODO: fix 
    let scrollToBottom = () => {
        let container = document.getElementById("custom-container");
        container.scrollTop = container.scrollHeight;
    }

    let moveArrayIndex = (array, oldIndex, newIndex) => {
        if (newIndex >= array.length) {
            return array;
            // let k = newIndex - array.length + 1;
            // while (k--) { array.push(undefined); }
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
        return array;
    };

    let shiftTaskUp = (taskID) => {
        let tasksCopy = lesson.tasks;
        let oldIndex = tasksCopy.findIndex(elem => elem.taskID === taskID);
        if (oldIndex > 0) moveArrayIndex(tasksCopy, oldIndex, oldIndex - 1);
        let updatedLesson = {...lesson, tasks: tasksCopy};
        setLesson(updatedLesson);
    }
    let shiftTaskDown = (taskID) => {
        let tasksCopy = lesson.tasks;
        let oldIndex = tasksCopy.findIndex(elem => elem?.taskID === taskID);
        console.log(`id ${taskID} old index: ${oldIndex} len: ${tasksCopy.length}`)
        if (oldIndex < tasksCopy.length) moveArrayIndex(tasksCopy, oldIndex, oldIndex + 1);
        let updatedLesson = {...lesson, tasks: tasksCopy};
        setLesson(updatedLesson);
    }

    if (!ready) return <Loader />;
    return(
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
                            task={task} 
                            key={task.taskID}
                            index={index}
                            onTasksChange={onTasksChange} 
                            shiftTaskDown={shiftTaskDown}
                            shiftTaskUp={shiftTaskUp}
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
    )
}

export default EditLesson;