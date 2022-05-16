import React, {  } from "react";

function PossibleAnswer(props) {
    return(
        <div
            className={`multiple-choice-answer cursor-pointer answer transition-all
                ${props.chosen ? "hover:bg-slate-300 bg-slate-300" : "hover:bg-slate-100"}`}
            onClick={() => {
                props.setChoice(props.index)
            }}
        >
            { props.possible.middleText ? (
                <div className="middle-text">
                    {props.possible.middleText}
                </div>
            ) : null }
            { props.possible.bottomText ? (
                <div className="bottom-text">
                    {props.possible.bottomText}
                </div>
            ) : null }
        </div>
    )
}

export default PossibleAnswer;