import React, { useState } from "react";

function ScrollPrompt(props) {
    const [hovering, setHovering] = useState(false);

    return(
        <a 
            href={props.scrollTo}
            title={props.text}
            className="z-50 mr-4 mt-2 absolute bottom-0 left-0
                w-10/12
                md:my-4 md:w-3/6
                lg:my-6 lg:mr-8" // lg:w-2/6
            onClick={e => {
                // this is a manual override of the anchor scroll behaviour,
                // as I could not get smooth scrolling via css to work without
                // enabling flags in Chrome.
                e.preventDefault();
                let scrollTo = document.getElementById(props.scrollTo.substring(1));
                scrollTo.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
                // this ensures the element is always above mobile browser UI
                marginBottom: "calc(env(safe-area-inset-bottom) + 0.5rem)"
            }}
        >
            <div 
                id="scroll-prompt" 
                className={`px-6 py-2 ml-[-0.5rem]
                    flex items-center 
                    bg-white text-black
                    transition-all
                    ${hovering ? "" : "animate-bounce-x"}`} //hover:pl-6 
                style={{
                    transform: hovering ? "translateX(7.5px)" : "",
                    animationDelay: "4000ms"
                }}
                onMouseEnter={() => {setHovering(true)}}
                onMouseLeave={() => {setHovering(false)}}
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
                <span className="ml-4 text-md md:text-xl font-bold tracking-wide">
                    { props.text }
                </span>
            </div>
        </a>
    )
}

export default ScrollPrompt;