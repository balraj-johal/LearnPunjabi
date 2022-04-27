import React from "react";

function FormLabel(props) {
    return(
        <label 
            htmlFor={`${props.for}`}
            style={{textTransform: "capitalize"}}
        >
            {props.for}:
        </label>
    )
}

export default FormLabel;