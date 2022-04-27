import React, {  } from "react";

function ScrollPrompt(props) {
    return(
        <div id="scroll-prompt" className="animate-bounce">
            scroll for more
            <svg width="62" height="31" viewBox="0 0 62 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L31 28L60 2" stroke="white" strokeWidth="4"/>
            </svg>
        </div>
    )
}

export default ScrollPrompt;