import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

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
     *  @name checkAnswer
     */
    let checkAnswer = () => {
        if (choice === Number(props.data.correctAnswerIndex)) {
            props.handleCorrect();
            return;
        }
        props.handleWrong();
        setChoice(null);
    }

    return(
        <div className="multiple-choice flex flex-col
            justify-center h-full"
        >
            <div className="md:h-4/5 md:mt-[-50px] flex flex-col justify-evenly">
                <div className="title relative top-2 left-3 md:w-full w-11/12
                    flex flex-row justify-between md:flex-col md:justify-start
                    md:px-4 px-0 md:items-start items-center"
                >
                    <span className="mb-4">
                        { props.data.text }
                    </span>
                    <AudioClip src={props.data.audioLink} />
                </div>
                <div className={`answers-wrap ${props.animClasses}`}>
                    { props.data.possibleAnswers.map((possible, index) => 
                        <PossibleAnswer 
                            chosen={(choice === index) ? true : false}
                            setChoice={setChoice}
                            possible={possible} 
                            key={index}
                            index={index}
                        />
                    ) }
                </div>
            </div>
            <NextButton next={() => {checkAnswer()}} />
        </div>
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