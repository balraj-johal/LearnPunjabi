import React, {  } from "react";

function FormTextInput(props) {
    return(
        <input
            className="rounded border-2 border-black px-1 
            py-0.5 w-5/12 my-1"
            onChange={props.onChange}
            placeholder={props.placeholder}
            value={props.value}
            error={props.error}
            id={`${props.for}`}
            type={props.type ? props.type : "text"}
        />
    )
}

export default FormTextInput;