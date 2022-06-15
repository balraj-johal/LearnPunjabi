import React, {  } from "react";

function NextButton(props) {
    return(
        <div className="w-full flex justify-end h-1/6 pb-4 md:pb-0">
            <button 
                className="md:w-56 w-4/6 h-8 md:h-10
                    cursor-pointer rounded no-highlight
                    bg-primary hover:bg-secondary hover:drop-shadow-md
                    mb-6 md:mb-4 mt-6 z-20 text-white
                    capitalize transition-all duration-75 md:text-xl" 
                onClick={()=>{ props.next() }}
            >
                {props.text || "Next"} &gt;
            </button>
        </div>
    );
}

export default NextButton;