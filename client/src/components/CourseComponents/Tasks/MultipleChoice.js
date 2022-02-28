import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

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
                <div className="audio">
                    <audio 
                        id={`audio-${props.data.audioSrc}`} 
                        src={ `https://d2hks59q0iv04y.cloudfront.net/${props.data.audioSrc}` }
                        autoPlay={true}
                    />
                    <div className="replay-audio-button button" onClick={() => {
                        let audElem = document.getElementById(`audio-${props.data.audioSrc}`);
                        audElem.currentTime = 0;
                        audElem.play();
                    }}>replay</div>
                </div>
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
}

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

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
    }
)(MultipleChoice);