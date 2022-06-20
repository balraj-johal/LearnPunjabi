import React, {  } from "react";

function ScrollPrompt(props) {
    return(
        <a href={props.scrollTo} className="z-50">
            <div 
                id="scroll-prompt" 
                className="flex mr-4 mt-2 cursor-pointer 
                    bg-white text-black
                    md:my-4 lg:my-6 lg:mr-8
                    absolute
                    px-4 py-2 items-center" 
                style={{
                    marginBottom: "calc(env(safe-area-inset-bottom) + 0.5rem)"
                }}
            >
                <svg 
                    viewBox="0 0 62 31" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    id="scroll-arrow"
                    className="lg:w-2 lg:mb-1"
                >
                    <path d="M2 2L31 28L60 2" stroke="black" strokeWidth="4"/>
                </svg>
                <span className="ml-4 text-md md:text-xl font-bold tracking-wide
                    ">
                    { props.text }
                </span>
            </div>
        </a>
    )
}

export default ScrollPrompt;