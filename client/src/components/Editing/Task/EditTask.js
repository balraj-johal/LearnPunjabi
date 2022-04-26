import React, { useEffect, useState } from "react";
import FormInput from "../../FormComponents/FormInput";

import EditMultipleChoice from "./MultipleChoice/EditMultipleChoice";
import EditSpecifiedOrder from "./SpecifiedOrder/EditSpecifiedOrder";
import UpDownShifter from "../UpDownShifter";

function EditTask(props) {
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
            <UpDownShifter 
                shuffle={props.shuffle} 
                listEndsState={props.listEndsState} 
                shiftTaskUp={props.shiftTaskUp} 
                shiftTaskDown={props.shiftTaskDown} 
                id={task.taskID}
                index={props.index}
            />
            <div className="w-5/12">
                <FormInput type="taskType" for="taskType" value={task.type} onChange={onChange} errors={props.errors[task.taskID]} />
                <FormInput type="textarea" for="text" value={task.text} onChange={onChange} errors={props.errors[task.taskID]} />
                <FormInput type="text" for="audioSrc" value={task.audioSrc || ""} onChange={onChange} errors={props.errors[task.taskID]} />
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
        </div>
    )
}

export default EditTask;