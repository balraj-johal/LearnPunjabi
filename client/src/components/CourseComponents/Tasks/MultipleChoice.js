import React, { useState } from "react";
import { connect } from "react-redux";

function MultipleChoice(props) {
    let [choice, setChoice] = useState(null);

    let checkAnswer = () => {
        if (choice !== null) {
            if (choice === props.taskData.correctAnswerIndex) {
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
            { props.taskData.text }
            { props.taskData.audioSrc ? (
                <div className="audio">
                    <audio 
                        id={`audio-${props.taskData.audioSrc}`} 
                        src={ `https://balraj-portfolio-bucket.s3.eu-west-2.amazonaws.com/test.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCWV1LXdlc3QtMiJHMEUCIQDpw%2F68n%2BGg%2FETKw8beAIFcT0QtkzfSXpAtTQ5izpVs2QIgEOUCFZvr34WsU2BypCe8ebDPvRMWKnmdTou%2FV8kRGIEq7QIIw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyODQ4MzY1MjYzMTMiDEH6qcGS9rLjVJKKEyrBAmioyYI29zQA6bYOH0CTsUfGVNBaktFjgf6lDIEty2zB%2F%2B0kQG3l0%2FnEtrLFWWOYwKQthY0IKG9WOj5YFgEptmnOZWVxksEsVGk5k%2F3udqQLq%2Bz9sJOMQu0QvbA5WwF%2FYedMF5s3%2B%2FnyAHgqUvPv6hNLWMdpCVCkXgnS7mrQm9K%2BGDehrSUtQZFNeSKIb4AYhVADXW8JqWZrlST1VFjZUthzTr7QqaET6BRHW6i%2F91CBaAwYUnhBtMsCCHXwvht5dVMijGewiWri4Rphdxrqv3EE6Qr9YVy2VZLJjsIm3bH%2BTseSW6mRZGRY2ylaRhSFFclpyERMfTPHoaOCRjYrPwO3sNVkzaaDRiTBnhk5xH%2FzuYbjCSsmteFIx0tVFvXP%2FNsykjROc1IcgS7%2BGZN%2BuPI6y%2BPi%2BcmexNRfPJ8Cdi6hNDC2%2BrSQBjqzAmUjLdHd87fqQ6DD6ggoYiiF3a7pTDkWboxzH%2FI4%2FLlE8G%2B8nhi8s2CNGYYdx95AvZ3SsqQAUjW6gdGuMnzcB9%2BpvSRWmhELhGpmVJoJlLgcqqfyxyIxfSQ1bQ%2FgKXC0Z8q9JOHZSQbW6f1A2B73%2BrdgqXWoylgBJcE9iMFZcvLJawoOs%2Fdmhv8RBrcxFdC2qiUx96FwKNYP4wHYuNBULz9XX9AXq4Y1pron9nJnNZbE%2BJubXrvoujywMLulbHeh3Ag8YOsMPFEnvpSFv%2F8l6cG1JaVe%2BGArp3GhQ6yV84a6hZX7J5ASSmHK7g2xki9i5jnN4fm3xqFMVlU7EIteix400fPYH0kQGdga0RQ86gBb6ELfUAZNEomHVpmgd23YS4HgHbEHGZ65QQ%2FBpwTj6zS%2BnQQ%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220216T180826Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAUEUMUPDU54EN7DBP%2F20220216%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Signature=5c3f4c301dd1f7d0d7eb02633c36f6fe9671fcd7e80938f7c265554e3d0ce820` }
                        autoPlay={true}
                    />
                    <div className="replay-audio-button" onClick={() => {
                        let audElem = document.getElementById(`audio-${props.taskData.audioSrc}`);
                        audElem.currentTime = 0;
                        audElem.play();
                    }}>replay</div>
                </div>
            ) : null }
            <div className="answers-wrap">
                { props.taskData.possibleAnswers.map((possible, index) => 
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