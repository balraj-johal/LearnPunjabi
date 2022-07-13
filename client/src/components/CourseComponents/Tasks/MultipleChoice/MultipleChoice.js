import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import TaskHeader from "../TaskHeader";
import NextButton from "../NextButton";
import MultChoiceAnswer from "./MultChoiceAnswer";

function MultipleChoice(props) {
    let focusTarget = useRef();
    let [focusTargetIndex, setFocusTargetIndex] = useState(0);
    let [choice, setChoice] = useState(null);

    // clear chosen answer when task data changes
    useEffect(() => {
        setChoice(null);
    }, [props.data])

    /** checks if answer is correct and handles outcome 
     *  @name checkAnswer
     */
    let checkAnswer = () => {
        if (choice === Number(props.data.correctAnswerIndex)) {
            props.handleCorrect();
            return;
        }
        setFocusTargetIndex(0);
        props.handleWrong();
        setChoice(null);
    }

    /**
     * Implements keyboard controls by updating which answer has the focus target ref
     * @name updateFocus
     * @param {String} direction - "left" or "right"
     */
    let handleArrowKeys = (direction) => {
        let newIndex = 0;
        if (direction === "left") {
            newIndex = focusTargetIndex -= 1;
            if (newIndex < 0) newIndex = props.data.possibleAnswers.length - 1;
        } else if (direction === "right") {
            newIndex = focusTargetIndex += 1;
            if (newIndex > props.data.possibleAnswers.length - 1) newIndex = 0;
        }
        setFocusTargetIndex(newIndex);
    }
    useEffect(() => {
        focusTarget.current.focus();
    }, [focusTargetIndex])

    return(
        <>
            <div
                data-testid="mult-choice" 
                className="multiple-choice flex flex-col h-5/6"
            >
                <TaskHeader data={props.data} />
                <div className={`answers-wrap h-5/6 py-2 items-center
                    md:h-4/6 md:flex-row 
                    flex-col ${props.animClasses}`}
                >
                    { props.data.possibleAnswers.map((possible, index) => 
                        <MultChoiceAnswer 
                            ref={index === focusTargetIndex ? focusTarget : null}
                            chosen={choice === index ? true : false}
                            setChoice={setChoice}
                            handleArrowKeys={handleArrowKeys}
                            setFocusTargetIndex={setFocusTargetIndex}
                            possible={possible} 
                            key={possible.middleText}
                            index={index}
                        />
                    ) }
                </div>
            </div>
            <NextButton next={() => { checkAnswer() }} text="Check Answer" />
        </>
    );
};

//pull relevant props from redux state
const mapStateToProps = state => ({
    animClasses: state.currTask.animClasses
});

export default connect(
    mapStateToProps,
    {}
)(MultipleChoice);