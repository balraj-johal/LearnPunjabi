import React, {  } from "react";

function PossibleAnswer(props) {
    return(
        <div
            className={`multiple-choice-answer ${props.chosen ? "chosen" : ""}`}
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