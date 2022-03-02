import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { 
    DragDropContext, 
    Droppable, 
    Draggable 
} from 'react-beautiful-dnd';

function SpecifiedOrder(props) {
    let [answer, setAnswer] = useState(null);

    useEffect(() => {
        setAnswer(null);
    }, [props.data])

    let checkAnswer = () => {
        if (answer !== null) {
            if (answer === true) { //if correct
                alert("answer right")
                props.submitAnswer(true);
            } else {
                alert("answer wrong")
                setAnswer(null);
                props.submitAnswer(false);
            }
        } else {
            alert("Please choose an answer...")
        }
    }

    return(
        <div className="task specified-order">
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
            <DragDropContext>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul 
                            className="answers-wrap" 
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                        >
                            { props.data.possibleAnswers.map((possible, index) => 
                                <PossibleAnswer 
                                    possible={possible}
                                    key={index}
                                    index={index}
                                />
                            ) }
                        </ul>
                    )}
                </Droppable>
          </DragDropContext>
            {/* <div className="answers-wrap">
                { props.data.possibleAnswers.map((possible, index) => 
                    <PossibleAnswer 
                        possible={possible}
                        key={index}
                        index={index}
                    />
                ) }
            </div> */}
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
        <Draggable draggableId={String(props.index)} index={props.index} >
            {(provided) => (
                <li
                    className={`specified-order-answer`}
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                >
                    { props.possible.text ? (
                        <div className="text">
                            {props.possible.text}
                        </div>
                    ) : null }
                </li>
            )}
        </Draggable>
        // <div
        //     className={`specified-choice-answer`}
        // >
        //     { props.possible.text ? (
        //         <div className="text">
        //             {props.possible.text}
        //         </div>
        //     ) : null }
        // </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
    }
)(SpecifiedOrder);