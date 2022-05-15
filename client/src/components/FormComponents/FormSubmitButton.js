import React from "react";

function FormSubmitButton(props) {
    return(
        <div className={`button-wrap-${props.for} md:my-4 w-full md:w-auto`} >
            <button
                type="submit"
                className="capitalize h-8 md:h-10 bg-primary rounded 
                    text-white px-4 w-full hover:bg-primary2 transition-all duration-100"
                disabled={props.disabled || false}
            >
                {props.text || props.for}
            </button>
        </div>
    )
}

export default FormSubmitButton;