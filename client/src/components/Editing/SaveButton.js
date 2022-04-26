import React, {  } from "react";

function SaveButton(props) {
    return(
        <div 
            className={`capitalize h-10 bg-blue-500 rounded w-4/12 float-right mt-12
                text-white px-4 cursor-pointer flex justify-center items-center
                ${props.show ? "" : "hidden"}`}
            onClick={() => { props.save(); }}
        >
            Save Order
        </div>
    )
}

export default SaveButton;