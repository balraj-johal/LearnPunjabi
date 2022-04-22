import React, { useState } from "react";

import EditMultipleChoice from "./MultipleChoice/EditMultipleChoice";
import EditSpecifiedOrder from "./SpecifiedOrder/EditSpecifiedOrder";

function TaskForm(props) {
    let [task, setTask] = useState(props.task);

    /** updates form state on change of form field value
     * @name onChange
     * @param {Object} e - change event
    */
    let onChange = e => {
        let taskCopy = {...task};
        taskCopy[e.target.id] = e.target.value;
        setTask(taskCopy);
        props.onTasksChange(taskCopy);
    }
    
    /** updates task with new answers data fully, 
     * ensuring each property is matched
     * @name onChange
     * @param {Object} aData - answers data
    */
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
            <div className={`
                absolute top-0 left-0 w-8 h-16 
                flex flex-col items-center justify-center text-gray-400
                text-xs 
                ${props.shuffle ? "hidden" : ""}
            `}>
                <div
                    className={`${props.listEndsState === "first" ? "hidden" : "no"}`} 
                    onClick={() => { props.shiftTaskUp(task.taskID); }}>
                    ▲
                </div>
                {props.index}
                <div
                    className={`${props.listEndsState === "last" ? "hidden" : "no"}`} 
                    onClick={() => { props.shiftTaskDown(task.taskID); }}>
                    ▼
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
                    onChange={e => { onChange(e); }}
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
            <div className="input-field my-4 flex flex-col w-5/12">
                <label 
                    htmlFor="audioSrc"
                    style={{textTransform: "capitalize"}}
                >
                    Audio FIlename - if needed:
                </label>
                <input
                    onChange={onChange}
                    value={task.audioSrc}
                    placeholder="enter audio filename here"
                    id="audioSrc"
                    type="text"
                    className="rounded border-2 border-black px-1 py-0.5 
                        w-full my-0.5"
                />
            </div>
            <div className="answers-wrap my-4 w-10/12">
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