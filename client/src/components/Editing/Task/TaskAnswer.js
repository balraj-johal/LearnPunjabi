import React from "react";

function TaskAnswer(props) {
    let styles = props.extraStyles || null;
    return(
        <div 
            className="relative" 
            // key={props.index}
        >
            <input
                className={`rounded border-2 border-black px-1 py-0.5 
                    w-28 h-28 text-center m-3 transition-all ${styles}`}
                value={props.value} 
                id={`possible-answer-${props.index}`} 
                onChange={props.onChange}
            />
            {props.children}
        </div>
    )
}

export default TaskAnswer;