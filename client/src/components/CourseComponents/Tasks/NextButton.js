import React, {  } from "react";

function NextButton(props) {
    return(
        <button className="w-28 text-white h-8 bg-primary cursor-pointer rounded
            hover:bg-primary2 my-4 mt-6 hover:drop-shadow-md" 
            onClick={()=>{ props.next() }}
        >
            Next &gt;
        </button>
    );
}

export default NextButton;