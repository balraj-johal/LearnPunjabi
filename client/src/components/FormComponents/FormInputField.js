import React, { useEffect } from "react";

function FormInputField(props) {
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
                type="text"
            />
        </div>
    )
}

export default FormInputField;