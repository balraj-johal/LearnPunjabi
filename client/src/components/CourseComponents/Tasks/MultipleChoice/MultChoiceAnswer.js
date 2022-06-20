import React, {  } from "react";

function MultChoiceAnswer(props) {
    return(
        <div
            className={`multiple-choice-answer cursor-pointer answer transition-all
                shadow-sm border-[1.5px] border-slate dark-answer
                ${props.chosen ? "hover:bg-slate-200 bg-slate-200 chosen" : 
                    "hover:bg-slate-100"}`}
            data-testid={`answer-${props.index}`}
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

export default MultChoiceAnswer;