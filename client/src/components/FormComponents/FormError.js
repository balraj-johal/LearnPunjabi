import React from "react";

function FormError(props) {
    return(
        <div 
            role="alert"
            aria-relevant="all"
            className="form-error"
        >
            { props.error }
        </div>
    )
}

export default FormError;