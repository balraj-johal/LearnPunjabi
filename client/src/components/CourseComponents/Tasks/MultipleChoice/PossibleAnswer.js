import React, {  } from "react";

function PossibleAnswer(props) {
    return(
        <div
            className={`multiple-choice-answer cursor-pointer answer transition-all
                shadow-sm border-[1.5px] border-slate
                ${props.chosen ? "hover:bg-slate-200 bg-slate-200" : 
                    "hover:bg-slate-100"}`}
            onClick={() => {
                props.setChoice(props.index)
            }}
        >
            { props.possible.middleText && (
                <div className="middle-text">
                    {props.possible.middleText}
                </div>
            ) }
            { props.possible.bottomText && (
                <div className="bottom-text">
                    {props.possible.bottomText}
                </div>
            ) }
        </div>
    )
}

export default PossibleAnswer;