import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { 
    DragDropContext, 
    Droppable, 
    Draggable 
} from 'react-beautiful-dnd';

function SpecifiedOrder(props) {
    let [order, setOrder] = useState([]);

    // initialise state when task data changes
    useEffect(() => {
        setOrder(props.data.possibleAnswers);
    }, [props.data])

    /**
     * check if the submitted answer is correct and handle consequences
     * @name checkAnswer
     */
    let checkAnswer = () => {
        if (order !== null) {
            if (getAnswerString().includes(props.data.correctAnswer)) {
                alert("answer right")
                props.submit(true);
            } else {
                alert("answer wrong");
                props.submit(false);
            }
        } else {
            alert("Please choose an answer...")
        }
    }

    /**
     * update the stored list state when an element has been dragged
     * @name handleDragEnd
     * @param {Object} result - result object from the onDragEnd event of the dragdrop Context
     */
    let handleDragEnd = (result) => {
        const newarray = [...order];
        const [reordered] = newarray.splice(result.source.index, 1);
        newarray.splice(result.destination.index, 0, reordered);
        setOrder(newarray);
    }

    /**
     * get the string containing the current answer state
     * @name getAnswerString
     * @returns {String} - string containing current order's text concatenated together
     */
    let getAnswerString = () => {
        let str = "";
        order.forEach(elem => {
            str += elem.text
        })
        return str;
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

            <DragDropContext onDragEnd={handleDragEnd} >
                <Droppable droppableId="characters" direction="horizontal" >
                    {(provided) => (
                        <ul 
                            className="answers-wrap" 
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                        >
                            { order.map((data, index) => 
                                <AnswerFragment 
                                    possible={data}
                                    key={index}
                                    index={index}
                                />
                            ) }
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

            <div onClick={()=>{
                checkAnswer();
            }}>
                Submit &gt;
            </div>
        </div>
    );
}

function AnswerFragment(props) {
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
                        <div className="text"> {props.possible.text} </div>
                    ) : null }
                </li>
            )}
        </Draggable>
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