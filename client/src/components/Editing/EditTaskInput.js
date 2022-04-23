import React, {  } from "react";

function EditTaskInput(props) {
    let component;
    switch (props.type) {
        case "textarea":
            component = <EditTaskTextarea for={props.for} task={props.task} onChange={props.onChange} />
            break;
        case "textInput":
            component = <EditTaskTextInput for={props.for} task={props.task} onChange={props.onChange} />
            break;
        case "taskType":
            component = <EditTaskTypeSwitcher for={props.for} task={props.task} onChange={props.onChange} />
            break;
        default:
            component = null;
            break;
    }

    return(
        <div className="input-field my-4 flex flex-col w-5/12">
            {component}
        </div>
    )
}

function EditTaskTextarea(props) {
    return(
        <>
            <label 
                htmlFor={`${props.for}`}
                style={{textTransform: "capitalize"}}
            >
                {props.for}:
            </label>
            <textarea
                onChange={props.onChange}
                value={props.task[props.for]}
                placeholder={`Task ${props.for} here`}
                id={`${props.for}`}
                type="text"
                className="rounded border-2 border-black px-1 py-0.5 
                    w-full h-28 my-0.5"
            />
        </>
    )
}

function EditTaskTextInput(props) {
    return(
        <>
            <label 
                htmlFor={`${props.for}`}
                style={{textTransform: "capitalize"}}
            >
                {props.for}:
            </label>
            <input
                onChange={props.onChange}
                value={props.task[props.for]}
                placeholder={`Task ${props.for} here`}
                id={`${props.for}`}
                type="text"
                className="rounded border-2 border-black px-1 py-0.5 
                    w-full my-0.5"
            />
        </>
    )
}

function EditTaskTypeSwitcher(props) {
    return(
        <>
            <label 
                htmlFor={`${props.for}`}
                style={{textTransform: "capitalize"}}
            >
                {props.for}:
            </label>
            <select 
                id="type" 
                onChange={props.onChange}
                className="rounded border-2 border-black px-1 py-0.5 
                    w-full my-0.5"
                value={props.task.type}
            >
                <option value="TextOnly">Text Only</option>
                <option value="MultipleChoice">Multiple Choice</option>
                <option value="SpecifiedOrder">Specified Order</option>
            </select>
        </>
    )
}


export default EditTaskInput;