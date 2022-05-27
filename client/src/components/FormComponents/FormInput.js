import React, { useEffect } from "react";
import FormError from "./FormError";
import FormLabel from "./FormLabel";

function FormInput(props) {
    let component;
    switch (props.type) {
        case "textarea":
            component = <FormTextArea 
                for={props.for} 
                value={props.value}
                // task={props.task} 
                onChange={props.onChange} 
            />
            break;
        case "text":
            component = <FormText 
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                placeholder={props.placeholder}
                extraStyles={props.extraStyles}
            />
            break;
        case "file":
            component = <FormFile
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                placeholder={props.placeholder}
                extraStyles={props.extraStyles}
            />
            break;
        case "username":
            component = <FormText 
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                placeholder={props.placeholder}
                extraStyles={props.extraStyles}
                typeOverride="username"
            />
            break;
        case "password":
            component = <FormText 
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                placeholder={props.placeholder}
                extraStyles={props.extraStyles}
                typeOverride="password"
            />
            break;
        case "checkbox":
            component = <FormCheckbox
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                extraStyles={props.extraStyles}
            />
            break;
        case "taskType":
            component = <FormTaskType 
                for={props.for} 
                value={props.value}
                // task={props.task} 
                onChange={props.onChange} 
            />
            break;
        case "number":
            component = <FormNumber 
                for={props.for} 
                value={props.value}
                task={props.task} 
                onChange={props.onChange} 
                extraStyles={props.extraStyles}
            />
            break;
        default:
            component = <FormText 
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                placeholder={props.placeholder}
                extraStyles={props.extraStyles}
            />
            break;
    }

    return(
        <div className={`"input-field my-1 md:my-4 flex flex-${props.row ? "row" : "col"}`}>
            <FormLabel for={props.for} />
            {component}
            <FormError for={props.for} errors={props.errors} />
        </div>
    )
}

const INPUT_STYLES = `rounded border-2 border-slate-200 px-1 py-0.5 
    w-full my-0.5 focus:border-blue-400 outline-0 transition-all`

function FormTextArea(props) {
    return(
        <textarea
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            id={`${props.for}`}
            type="text"
            className={`${INPUT_STYLES} ${props.extraStyles} h-28`}
        />
    )
}

function FormText(props) {
    return(
        <input
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            id={`${props.for}`}
            type={props.typeOverride || "text"}
            className={`${INPUT_STYLES} ${props.extraStyles}`}
        />
    )
}

function FormFile(props) {
    return(
        <input
            onChange={props.onChange}
            accept="audio/*"
            id={`${props.for}`}
            type="file"
            className={`${INPUT_STYLES} ${props.extraStyles}`}
        />
    )
}

function FormNumber(props) {
    return(
        <input
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            id={`${props.for}`}
            type="number"
            className={`${INPUT_STYLES} ${props.extraStyles}`}
        />
    )
}

function FormCheckbox(props) {
    return(
        <input
            className={`rounded border-2 border-black w-6 h-6 
                px-1 py-0.5 mx-3 ${props.extraStyles}`}
            onChange={props.onChange}
            checked={props.value}
            id={props.for}
            type="checkbox"
        />
    )
}

function FormTaskType(props) {
    return(
        <select 
            id="type" 
            onChange={props.onChange}
            value={props.value}
            className={`${INPUT_STYLES} ${props.extraStyles}`}
        >
            <option value="TextOnly">Text Only</option>
            <option value="MultipleChoice">Multiple Choice</option>
            <option value="SpecifiedOrder">Specified Order</option>
        </select>
    )
}


export default FormInput;