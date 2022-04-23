import React, {  } from "react";

function UpDownShifter(props) {

    return(
        <div className={`absolute top-0 left-0 w-8 h-16 text-xs 
            flex flex-col items-center justify-center text-gray-400
            ${props.shuffle ? "hidden" : ""}`}
        >
            <div
                className={`${props.listEndsState === "first" ? "hidden" : "no"}`} 
                onClick={() => { props.shiftTaskUp(props.id); }}>
                ▲
            </div>
            {props.index}
            <div
                className={`${props.listEndsState === "last" ? "hidden" : "no"}`} 
                onClick={() => { props.shiftTaskDown(props.id); }}>
                ▼
            </div>
        </div>
    )
}

export default UpDownShifter;