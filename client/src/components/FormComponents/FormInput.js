import React, {  } from "react";
import FormError from "./FormError";
import FormLabel from "./FormLabel";

function FormInput(props) {
    let component;
    switch (props.type) {
        case "textarea":
            component = <FormTextArea 
                for={props.for} 
                value={props.value}
                onChange={props.onChange} 
                required={props.required}
            />
            break;
        case "text":
            component = <FormText 
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                placeholder={props.placeholder}
                extraStyles={props.extraStyles}
                required={props.required}
                autoComplete={props.autoComplete}
            />
            break;
        case "file":
            component = <FormFile
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                placeholder={props.placeholder}
                extraStyles={props.extraStyles}
                required={props.required}
            />
            break;
        case "username":
            component = <FormText 
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                placeholder={props.placeholder}
                extraStyles={props.extraStyles}
                required={props.required}
                typeOverride="username"
                autoComplete="username"
            />
            break;
        case "password":
            component = <FormText 
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                placeholder={props.placeholder}
                extraStyles={props.extraStyles}
                required={props.required}
                typeOverride="password"
                autoComplete={props.autoComplete}
            />
            break;
        case "checkbox":
            component = <FormCheckbox
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                extraStyles={props.extraStyles}
                required={props.required}
            />
            break;
            case "taskType":
                component = <FormTaskType 
                    for={props.for} 
                    value={props.value}
                    onChange={props.onChange} 
                    required={props.required}
                />
                break;
            case "select":
                component = <FormSelect 
                    for={props.for} 
                    value={props.value}
                    onChange={props.onChange} 
                    required={props.required}
                />
                break;
        case "number":
            component = <FormNumber 
                for={props.for} 
                value={props.value}
                task={props.task} 
                onChange={props.onChange} 
                extraStyles={props.extraStyles}
                required={props.required}
                min={props.min}
                max={props.max}
                autoComplete={props.autoComplete}
            />
            break;
        default:
            component = <FormText 
                for={props.for} 
                onChange={props.onChange} 
                value={props.value}
                placeholder={props.placeholder}
                extraStyles={props.extraStyles}
                required={props.required}
                autoComplete={props.autoComplete}
            />
            break;
    }

    const error = props.errors?.[props.for];
    return(
        <div 
            aria-invalid={error ? true : false}
            className={`input-field my-1 md:my-4 flex 
                flex-${props.row ? "row" : "col"}
                ${error ? "error" : ""}`}
        >
            <FormLabel for={props.for} labelOverride={props.labelOverride} />
            <div className={`${error ? "animate-shake-x" : ""}`}>
                {component}
                <FormError error={error} />
            </div>
        </div>
    )
}

const INPUT_STYLES = `rounded border-2 border-slate-300 px-1 py-0.5 
    w-full my-0.5 focus:border-blue-500 dark-input outline-0 
    transition-all text-black`

function FormTextArea(props) {
    return(
        <textarea
            onChange={props.onChange}
            value={props.value}
            aria-required={props.required || false}
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
            aria-required={props.required || false}
            placeholder={props.placeholder}
            id={`${props.for}`}
            type={props.typeOverride || "text"}
            className={`${INPUT_STYLES} ${props.extraStyles}`}
            autoComplete={props.autoComplete}
        />
    )
}

function FormFile(props) {
    return(
        <input
        aria-required={props.required || false}
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
            aria-required={props.required || false}
            value={props.value}
            placeholder={props.placeholder}
            id={`${props.for}`}
            type="number"
            className={`${INPUT_STYLES} ${props.extraStyles}`}
            min={props.min}
            max={props.max}
            autoComplete={props.autoComplete}
        />
    )
}

function FormCheckbox(props) {
    return(
        <input
        aria-required={props.required || false}
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
            aria-required={props.required || false}
            className={`${INPUT_STYLES} ${props.extraStyles}`}
        >
            <option value="TextOnly">Text Only</option>
            <option value="MultipleChoice">Multiple Choice</option>
            <option value="SpecifiedOrder">Specified Order</option>
        </select>
    )
}

function FormSelect(props) {
    return(
        <select 
            id={props.for} 
            onChange={props.onChange}
            value={props.value}
            aria-required={props.required || false}
            className={`${INPUT_STYLES} ${props.extraStyles}`}
        >
            { props.options.map(elem => (
                <option value={elem}>{elem}</option>
            )) }
        </select>
    )
}

export default FormInput;