import React, { useEffect, useState } from "react";
import FormInput from "../../FormComponents/FormInput";

import EditMultipleChoice from "./MultipleChoice/EditMultipleChoice";
import EditSpecifiedOrder from "./SpecifiedOrder/EditSpecifiedOrder";
import UpDownShifter from "../UpDownShifter";

function EditTask(props) {
    let [task, setTask] = useState(props.task);

    useEffect(() => {
        if (task.audioFilename) return;
        let copy = {...task};
        copy.audioFilename = "";
        setTask(copy);
    }, [])

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
    
    /** updates form state for audio field on change of file
     * @name onFileChange
     * @param {Object} e - change event
    */
     let onFileChange = e => {
        let taskCopy = {...task};
        taskCopy.audio = e.target.files[0];
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
        <fieldset className="edit-task flex flex-col items-center relative
                rounded border-2 border-black p-4 first:my-4 my-8" 
            id={`edit-task-${task.taskID}`}
        >
            <legend>Task {task.taskID}</legend>
            <UpDownShifter 
                shuffle={props.shuffle} 
                listEndsState={props.listEndsState} 
                shiftTaskUp={props.shiftTaskUp} 
                shiftTaskDown={props.shiftTaskDown} 
                id={task.taskID}
                index={props.index}
            />
            <button 
                className="absolute top-0 right-0 text-md 
                    text-red-400 my-2 mx-3" 
                onClick={() => { props.deleteTask(task.taskID) }}
            >delete</button>
            <div className="w-5/12">
                <FormInput 
                    type="taskType" 
                    for="taskType" 
                    required={true}
                    value={task.type} 
                    onChange={onChange} 
                    errors={props.errors[task.taskID]} 
                />
                <FormInput 
                    type="textarea" 
                    for="text" 
                    required={true}
                    value={task.text} 
                    onChange={onChange} 
                    errors={props.errors[task.taskID]} 
                />
                <FormInput 
                    type="file"
                    for="audio"
                    value={task.audio}
                    onChange={onFileChange} 
                    errors={props.errors[task.taskID]} 
                />
            </div>
            <div className="answers-wrap my-4 w-10/12">
                <EditMultipleChoice 
                    task={task}
                    show={task.type === "MultipleChoice"}
                    onAnswerDataChange={onAnswerDataChange}
                    errors={props.errors[task.taskID]}
                />
                <EditSpecifiedOrder 
                    task={task}
                    show={task.type === "SpecifiedOrder"}
                    onAnswerDataChange={onAnswerDataChange}
                    errors={props.errors[task.taskID]}
                />
            </div>
        </fieldset>
    )
}

export default EditTask;