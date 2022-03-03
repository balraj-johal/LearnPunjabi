import React, { useEffect } from "react";

function FormInputField(props) {
    let typeDefault = "text";

    return(
        <div className="input-field">
            <label 
                htmlFor={props.dataElem}
                style={{textTransform: "capitalize"}}
            >
                {props.dataElem}:
            </label>
            <input
                onChange={props.onChange}
                value={props.value}
                error={props.error}
                id={`${props.dataElem}`}
                type={props.type ? props.type : "text"}
            />
        </div>
    )
}

export default FormInputField;