import React from "react";

function FormSubmitButton(props) {
    return(
        <div className={`button-wrap-${props.for} my-8`} >
            <button
                type="submit"
                className="capitalize h-10 bg-primary rounded text-white px-4"
            >
                {props.text || props.for}
            </button>
        </div>
    )
}

export default FormSubmitButton;