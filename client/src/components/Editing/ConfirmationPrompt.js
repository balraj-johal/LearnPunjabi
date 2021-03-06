import React, {  } from "react";
import Loader from "../Loader";

function ConfirmationPrompt(props) {
    if (props.saving) return(
        <div className={`w-screen h-screen flex justify-center items-center
            z-10 absolute top-0 left-0
            ${props.showConfirmation && !props.submitSuccess ? "" : "hidden"}    
        `}>
            <div className="opacity-50 w-screen h-screen bg-green-500 absolute">
            </div>
            <Loader />
        </div>
    ) 
    return(
        <div 
            aria-live="assertive"
            id="confirmation-prompt"
            className={`w-screen h-screen flex justify-center items-center
                z-10 absolute top-0 left-0
                ${props.showConfirmation && !props.submitSuccess ? "" : "hidden"}    
            `}
        >
            <div className="opacity-50 w-screen h-screen bg-green-500 absolute">
            </div>
            <div className="opacity-100 z-20 flex justify-between w-5/12 items-center">
                Do you want to save the lesson?
                <div>
                    <button
                        id="confirm-yes"
                        className="capitalize h-10 bg-primary rounded text-white 
                            px-4 mx-2 w-24"
                        onClick={() => { props.handleYes() }}
                    >
                        Yes
                    </button>
                    <button
                        id="confirm-no"
                        className="capitalize h-10 bg-red-500 rounded text-white 
                            px-4 mx-2 w-24"
                        onClick={() => { props.setShowConfirmation(false) }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPrompt;