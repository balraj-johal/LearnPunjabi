import React, { useState, useEffect } from "react";

import EditTextOnly from "./EditTextOnly";
import EditMultipleChoice from "./EditMultipleChoice";
import EditSpecifiedOrder from "./EditSpecifiedOrder";

function TaskForm(props) {
    let [task, setTask] = useState(props.task);

    let [memory, setMemory] = useState({
        TextOnly: {},
        MultipleChoice: {},
        SpecifiedOrder: {}
    });

    let updateMemory = () => {
        // let updated = {...memory};
        // updated[task.type] = task;
        // setMemory(updated);
    } 

    let onChange = e => {
        let taskCopy = {...task};
        taskCopy[e.target.id] = e.target.value;
        setTask(taskCopy);
        props.onTasksChange(taskCopy);
    }
    
    let onAnswerDataChange = (aData) => {
        let taskCopy = {...task};
        for (const property in aData) {
            taskCopy[property] = aData[property];
        }
        setTask(taskCopy);
        props.onTasksChange(taskCopy);
    }

    return(
        <div 
            className="edit-task flex flex-col items-center relative
                rounded border-2 border-black p-4 first:my-4 my-8" 
            id={`edit-task-${task.taskID}`}
        >
            <div className="absolute top-0 left-0 w-6 h-8 
                    flex flex-col items-center justify-center text-gray-400">
                <div onClick={() => {
                    props.shiftTaskUp(task.taskID);
                }}>
                    shiftup
                </div>
                {props.index}
                <div onClick={() => {
                    props.shiftTaskDown(task.taskID);
                }}>
                    shiftdown
                </div>
            </div>
            <div className="input-field my-4 flex flex-col w-5/12">
                <label 
                    htmlFor="type"
                    style={{textTransform: "capitalize"}}
                >
                    Type:
                </label>
                <select 
                    id="type" 
                    onChange={e => {
                        updateMemory();
                        onChange(e);
                    }}
                    className="rounded border-2 border-black px-1 py-0.5 w-full my-0.5"
                    value={task.type}
                >
                    <option value="TextOnly" >Text Only</option>
                    <option value="MultipleChoice" >Multiple Choice</option>
                    <option value="SpecifiedOrder" >Specified Order</option>
                </select>
            </div>
            <div className="input-field my-4 flex flex-col w-5/12">
                <label 
                    htmlFor="text"
                    style={{textTransform: "capitalize"}}
                >
                    Text:
                </label>
                <textarea
                    onChange={onChange}
                    value={task.text}
                    placeholder="Task text here"
                    id="text"
                    type="text"
                    className="rounded border-2 border-black px-1 py-0.5 
                        w-full h-28 my-0.5"
                />
            </div>
            <div className="answers-wrap my-4">
                <EditTextOnly 
                    task={task}
                    show={task.type === "TextOnly"}
                    onAnswerDataChange={onAnswerDataChange}
                />
                <EditMultipleChoice 
                    task={task}
                    show={task.type === "MultipleChoice"}
                    onAnswerDataChange={onAnswerDataChange}
                />
                <EditSpecifiedOrder 
                    task={task}
                    show={task.type === "SpecifiedOrder"}
                    onAnswerDataChange={onAnswerDataChange}
                />
            </div>
        </div>
    )
}

export default TaskForm;