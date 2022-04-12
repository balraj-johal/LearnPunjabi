import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import AudioClip from "../../AudioClip";
import PossibleAnswer from "./PossibleAnswer";

function MultipleChoice(props) {
    let [choice, setChoice] = useState(null);

    useEffect(() => {
        setChoice(null);
    }, [props.data])

    let checkAnswer = () => {
        if (choice !== null) {
            if (choice === props.data.correctAnswerIndex) {
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
        <div className="task multiple-choice">
            { props.data.text }
            { props.data.audioSrc ? (
                <AudioClip src={props.data.audioSrc} />
            ) : null }
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
            <div onClick={()=>{
                checkAnswer();
            }}>
                Submit &gt;
            </div>
        </div>
    );
};

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
    }
)(MultipleChoice);