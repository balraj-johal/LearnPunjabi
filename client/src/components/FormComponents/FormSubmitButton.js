import React from "react";

function FormSubmitButton(props) {
    return(
        <div className={`button-wrap-${props.for} md:my-4 w-full md:w-auto
            flex justify-center`} 
        >
            <button
                type="submit"
                className="capitalize h-9 mt-2 md:h-10 bg-primary rounded 
                    text-white px-4 w-full hover:bg-secondary mb-8 
                    transition-all duration-100 max-w-2xl"
                disabled={props.disabled || false}
            >
                {props.text || props.for}
            </button>
        </div>
    )
}

export default FormSubmitButton;