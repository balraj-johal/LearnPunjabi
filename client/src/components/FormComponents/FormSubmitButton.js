import React from "react";

function FormSubmitButton(props) {
    return(
        <div className={`button-wrap-${props.dataElem}`} >
            <button
                type="submit"
                style={{textTransform: "capitalize"}}
            >
                {props.dataElem}
            </button>
        </div>
    )
}

export default FormSubmitButton;