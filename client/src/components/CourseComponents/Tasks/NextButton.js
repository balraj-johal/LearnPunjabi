import React, {  } from "react";

function NextButton(props) {
    return(
        <button 
            className="md:w-44 w-3/6 text-white h-8 md:h-9 bg-primary 
                cursor-pointer rounded absolute bottom-0 right-0
                hover:bg-primary2 hover:drop-shadow-md 
                mb-6 md:mb-4 mt-6 mr-4 z-20 no-highlight
                capitalize transition-all duration-75" 
            onClick={()=>{ props.next() }}
        >
            {props.text || "Next"} &gt;
        </button>
    );
}

export default NextButton;