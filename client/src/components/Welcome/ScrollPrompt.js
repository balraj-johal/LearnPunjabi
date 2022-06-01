import React, {  } from "react";

function ScrollPrompt(props) {
    return(
        <a href="#welcome-2">
            <div id="scroll-prompt" className="flex mx-4 my-2 md:m-4">
                <svg 
                    viewBox="0 0 62 31" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    id="scroll-arrow"
                >
                    <path d="M2 2L31 28L60 2" stroke="white" strokeWidth="4"/>
                </svg>
                <span className="ml-4 text-md md:text-lg font-bold tracking-wide">
                    { props.text }
                </span>
            </div>
        </a>
    )
}

export default ScrollPrompt;