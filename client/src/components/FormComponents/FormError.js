import React, { useEffect, useState } from "react";

function FormError(props) {
    let [error, setError] = useState();

    useEffect(() => {
        if (!props.errors) return setError(null);
        if (Object.keys(props.errors).includes(props.for)) {
            setError(props.errors[props.for]);
        } else {
            setError(null);
        }
    }, [props.errors])

    return(
        <div 
            className={`auth-error`} 
            id={`${props.for}-error`}
        >
            { error }
        </div>
    )
}

export default FormError;