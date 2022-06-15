import React from "react";

function GenericButton(props) {
    return(
        <button className="w-28 text-white h-8 bg-primary cursor-pointer rounded
            hover:bg-secondary mb-4 mt-6 hover:drop-shadow-md mr-4 capitalize transition-all duration-75" 
            onClick={()=>{ props.handleClick() }}
        >
            {props.text}
        </button>
    );
}

export default GenericButton;