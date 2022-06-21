import React, {  } from "react";

function UpDownShifter(props) {

    return(
        <div className={`absolute top-0 left-0 w-8 h-16 text-xs 
            flex flex-col items-center justify-center text-gray-400
            ${props.shuffle ? "hidden" : ""}`}
        >
            <button
                className={`${props.listEndsState === "first" ? "hidden" : "no"}`} 
                onClick={() => { props.shiftTaskUp(props.id); }}>
                ▲
            </button>
            {props.index}
            <button
                className={`${props.listEndsState === "last" ? "hidden" : "no"}`} 
                onClick={() => { props.shiftTaskDown(props.id); }}>
                ▼
            </button>
        </div>
    )
}

export default UpDownShifter;