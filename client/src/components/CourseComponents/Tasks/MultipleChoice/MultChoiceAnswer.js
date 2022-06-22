import React, {  } from "react";

let MultChoiceAnswer = React.forwardRef((props, ref) => {

    /** Implements answer focus changing using arrow keys
     * @name handleArrows
     * @param {Object} e - key event
     */
    let handleArrows = (e) => {
        switch (e.keyCode) {
            case 37: //arrow left
                props.handleArrowKeys("left");
                break;
            case 39: //arrow right
                props.handleArrowKeys("right");
                break;
            default:
                break;
        }
    }

    return(
        <button
            ref={ref}
            className={`multiple-choice-answer cursor-pointer answer transition-all
                shadow-sm border-[1.5px] border-slate dark-answer hover:bg-slate-100
                ${props.chosen ? "bg-slate-100" : ""}`}
            data-testid={`answer-${props.index}`}
            onKeyDown={handleArrows}
            onFocus={() => props.setFocusTargetIndex(props.index)}
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
        </button>
    )
})

export default MultChoiceAnswer;