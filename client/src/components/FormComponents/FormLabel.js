import React from "react";

function FormLabel(props) {
    // insert spaces between words
    let text = props.for.replace(/([A-Z])/g, ' $1').trim()
    return(
        <label 
            htmlFor={`${props.for}`}
            style={{textTransform: "capitalize"}}
        >
            {props.labelOverride || text}:
        </label>
    )
}

export default FormLabel;