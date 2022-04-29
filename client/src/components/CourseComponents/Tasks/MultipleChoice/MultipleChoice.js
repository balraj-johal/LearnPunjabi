import React, { useEffect, useState } from "react";

import AudioClip from "../../AudioClip";
import NextButton from "../NextButton";
import PossibleAnswer from "./PossibleAnswer";

function MultipleChoice(props) {
    let [choice, setChoice] = useState(null);

    // clear chosen answer when task data changes
    useEffect(() => {
        setChoice(null);
    }, [props.data])

    /** checks if answer is correct and handles outcome 
     * @name checkAnswer
     */
    let checkAnswer = () => {
        if (choice !== null) {
            if (choice === Number(props.data.correctAnswerIndex)) {
                alert("answer right")
                props.submitAnswer(true);
            } else {
                alert("answer wrong")
                setChoice(null);
                props.submitAnswer(false);
            }
        } else {
            alert("Please choose an answer...")
        }
    }

    return(
        <div className="task animate-fade-in multiple-choice">
            { props.data.text }
            { props.data.audioSrc ? <AudioClip src={props.data.audioSrc} /> : null }
            <div className="answers-wrap">
                { props.data.possibleAnswers.map((possible, index) => 
                    <PossibleAnswer 
                        chosen={ (choice === index) ? true : false }
                        setChoice={setChoice}
                        possible={possible} 
                        key={index}
                        index={index}
                    />
                ) }
            </div>
            <NextButton next={() => {checkAnswer()}} />
        </div>
    );
};

export default MultipleChoice;