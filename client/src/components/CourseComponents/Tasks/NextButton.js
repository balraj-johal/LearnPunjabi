import React, {  } from "react";

function NextButton(props) {
    return(
        <div className="w-full flex justify-end h-1/6">
            <button 
                className="md:w-44 w-3/6 h-8 md:h-9
                    cursor-pointer rounded no-highlight
                    bg-primary hover:bg-primary2 hover:drop-shadow-md
                    mb-6 md:mb-4 mt-6 z-20 text-white
                    capitalize transition-all duration-75" 
                onClick={()=>{ props.next() }}
            >
                {props.text || "Next"} &gt;
            </button>
        </div>
    );
}

export default NextButton;