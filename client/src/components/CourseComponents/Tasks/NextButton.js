import React, {  } from "react";

function NextButton(props) {
    return(
        <button className="md:w-28 w-3/6 text-white h-8 bg-primary cursor-pointer rounded absolute bottom-0 right-0
            hover:bg-primary2 mb-4 mt-6 hover:drop-shadow-md mr-4 capitalize transition-all duration-75" 
            onClick={()=>{ props.next() }}
        >
            {props.text || "Next"} &gt;
        </button>
    );
}

export default NextButton;