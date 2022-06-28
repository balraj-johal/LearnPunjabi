import React from "react";

function GenericButton(props) {
    return(
        <button 
            className="w-40 text-white h-9 bg-primary cursor-pointer rounded
                hover:bg-secondary mb-4 mt-6 hover:drop-shadow-md mr-4 
                capitalize transition-all duration-75" 
            disabled={props.disabled}
            onClick={()=>{ props.handleClick() }}
        >
            {props.text}
        </button>
    );
}

export default GenericButton;