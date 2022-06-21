import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import AudioClip from "../../AudioClip";
import NextButton from "../NextButton";
import MultChoiceAnswer from "./MultChoiceAnswer";

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
        <>
            <div
                data-testid="mult-choice" 
                className="multiple-choice flex flex-col h-5/6"
            >
                <div className="title w-full h-1/6 md:h-2/6 px-0
                    flex flex-row justify-start items-center"
                >
                    <div className="w-full h-auto flex items-start">
                        <AudioClip src={props.data.audioLink} />
                        <span className={`pr-[30%] lg:text-xl
                            ${props.data.audioLink ? "ml-4 md:ml-10" : ""}`}
                        >
                            { props.data.text }
                        </span>
                    </div>
                </div>
                <div className={`answers-wrap h-5/6 md:h-4/6 py-2 items-center md:flex-row 
                    flex-col ${props.animClasses}`}
                >
                    { props.data.possibleAnswers.map((possible, index) => 
                        <MultChoiceAnswer 
                            chosen={(choice === index) ? true : false}
                            setChoice={setChoice}
                            possible={possible} 
                            key={index}
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