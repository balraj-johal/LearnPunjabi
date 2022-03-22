import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axiosClient from "../../axiosDefaults";
import qs from 'qs';

import Loader from "../Loader";

function EditLesson(props) {
    let { id } = useParams();
    
    let [lesson, setLesson] = useState();
    let [ready, setReady] = useState(false);

    let [successful, setSuccessful] = useState(false);
    let [errors, setErrors] = useState({});
    
    // when lesson ID is updated, get and save lesson data from server
    useEffect(() => {
        axiosClient.get(`/api/v1/lessons/${String(id)}`)
            .then(res => {
                setLesson(res.data);
                setReady(true);
            })
            .catch(err => { console.log("Get lesson error: ", err); })
    }, [id]);

    let onSubmit = e => {
        e.preventDefault();
        axiosClient.post(`/api/v1/lessons/${String(id)}`, qs.stringify(lesson))
            .then(res => { setSuccessful(true); })
            .catch(err => {
                console.log("request errored, ", err.response);
                setErrors(err.response.data);
            })
    }

    let onChange = e => {
        let lessonCopy = {...lesson};
        lessonCopy[e.target.id] = e.target.value;
        setLesson(lessonCopy);
        e.preventDefault();
    }

    let onTasksChange = newTask => {
        let tasksCopy = lesson.tasks;
        let targetIndex;
        tasksCopy.forEach((task, i) => {
            if (task.taskID === newTask.taskID) {
                targetIndex = i;
            }
        });
        tasksCopy[targetIndex] = newTask;
        let updatedLesson = {...lesson, tasks: tasksCopy}
        setLesson(updatedLesson);
    }

    if (ready) {
        return(
            <div className="edit-lesson">
                <div>
                    {lesson.shuffle ? "True" : "False"}
                </div>
                <div>
                    {/* {lesson.tasks} */}
                </div>
                <form className="register-form" noValidate onSubmit={ onSubmit }>

                    <div className="input-field">
                        <label 
                            htmlFor="name"
                            style={{textTransform: "capitalize"}}
                        >
                            Name:
                        </label>
                        <input
                            onChange={onChange}
                            value={lesson.name}
                            id="name"
                            error={errors.name}
                        />
                    </div>

                    <div className="input-field">
                        <label 
                            htmlFor="requiredCompletions"
                            style={{textTransform: "capitalize"}}
                        >
                            Required Completions:
                        </label>
                        <input
                            onChange={onChange}
                            value={lesson.requiredCompletions}
                            error={errors.requiredCompletions}
                            id="requiredCompletions"
                            type="number"
                        />
                    </div>

                    <div className="input-field">
                        <label 
                            htmlFor="shuffle"
                            style={{textTransform: "capitalize"}}
                        >
                            Shuffle Tasks: not working:
                        </label>
                        <input
                            onChange={onChange}
                            value={lesson.shuffle}
                            error={errors.shuffle}
                            id="shuffle"
                            type="checkbox"
                        />
                    </div>

                    <div className="tasks">
                        Tasks:
                        {lesson.tasks.map((task, index) => (
                            <TaskForm 
                                task={task} 
                                key={index} 
                                onTasksChange={onTasksChange} 
                            />
                        ))}
                    </div>

                </form>
            </div>
        )
    } else {
        return <Loader />;
    }
}

function TaskForm(props) {
    let [task, setTask] = useState(props.task);

    let [memory, setMemory] = useState({
        TextOnly: {},
        MultipleChoice: {},
        SpecifiedOrder: {}
    });
    useEffect(() => {
        updateMemory();
    }, [task.type]);

    let updateMemory = () => {
        let updated = {...memory};
        updated[task.type] = task;
        setMemory(updated);
    } 

    let onChange = e => {
        let taskCopy = {...task};
        taskCopy[e.target.id] = e.target.value;
        setTask(taskCopy);
        props.onTasksChange(taskCopy);
        updateMemory(); // this is only change - 1
    }

    return(
        <div className="edit-task" id={`edit-task-${task.taskID}`}>
            <div>Task ID: {task.taskID}</div>

            <div className="input-field">
                <label 
                    htmlFor="text"
                    style={{textTransform: "capitalize"}}
                >
                    Name:
                </label>
                <input
                    onChange={onChange}
                    value={task.text}
                    id="text"
                    type="text"
                />
            </div>

            <div className="input-field">
                <label 
                    htmlFor="type"
                    style={{textTransform: "capitalize"}}
                >
                    Type:
                </label>
                <select 
                    id="type" 
                    onChange={onChange}
                    value={task.type}
                >
                    <option value="TextOnly" >TextOnly</option>
                    <option value="MultipleChoice" >MultipleChoice</option>
                    <option value="SpecifiedOrder" >SpecifiedOrder</option>
                </select>
            </div>

            <div className="answers-wrap">
                <EditTextOnly 
                    task={task} 
                    show={task.type === "TextOnly"} 
                />
                <EditMultipleChoice 
                    task={task} 
                    show={task.type === "MultipleChoice"} 
                />
                <EditSpecifiedOrder 
                    task={task} 
                    show={task.type === "SpecifiedOrder"} 
                />
            </div>
        </div>
    )
}

function EditTextOnly(props) {
    return(
        <div style={{display: props.show ? "initial" : "none"}}>
            eto
        </div>
    )
}
function EditMultipleChoice(props) {
    return(
        <div style={{display: props.show ? "initial" : "none"}}>
            mc
        </div>
    )
}
function EditSpecifiedOrder(props) {
    return(
        <div style={{display: props.show ? "initial" : "none"}}>
            so
        </div>
    )
}

export default EditLesson;