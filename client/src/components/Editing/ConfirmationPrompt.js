import React, {  } from "react";

function ConfirmationPrompt(props) {
    return(
        <div className={`w-screen h-screen flex justify-center items-center
            z-10 absolute top-0 left-0
            ${props.showSubmitConfirm && !props.submitSuccess ? "" : "hidden"}    
        `}>
            <div className="opacity-50 w-screen h-screen bg-green-500 absolute">
            </div>
            <div className="opacity-100 z-20 flex justify-between w-5/12 items-center">
                Are you sure?
                <div>
                    <button
                        className="capitalize h-10 bg-primary rounded text-white px-4 mx-2 w-24"
                        onClick={() => { props.saveLesson() }}
                    >
                        Yes
                    </button>
                    <button
                        className="capitalize h-10 bg-red-500 rounded text-white px-4 mx-2 w-24"
                        onClick={() => { props.setShowSubmitConfirm(false) }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPrompt;