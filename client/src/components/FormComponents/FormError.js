import React from "react";

function FormError(props) {
    return(
        <div 
            className={`auth-error`} 
            id={`${props.dataElem}-error`}
        >
            { props.errors[props.dataElem] }
        </div>
    )
}

export default FormError;