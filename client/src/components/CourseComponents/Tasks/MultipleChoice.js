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
            {props.taskData.text}
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
            onClick={() => {
                props.setChoice(props.index)
            }}
            className={`multiple-choice-answer ${props.chosen ? "chosen" : null}`}>
            {props.possible.text}
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