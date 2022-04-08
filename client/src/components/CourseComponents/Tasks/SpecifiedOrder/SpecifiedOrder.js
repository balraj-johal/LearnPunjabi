import React, { useEffect, useState } from "react";
import { 
    DragDropContext, 
    Droppable, 
} from 'react-beautiful-dnd';

import DragAnswerFragment from "./DragAnswerFragment";
import PossAnswerFragment from "./PossAnswerFragment";

function SpecifiedOrder(props) {
    let [order, setOrder] = useState([]);
    let [possibleFrags, setPossibleFrags] = useState([]);

    let resetTask = () => {
        setOrder([]);
        setPossibleFrags(props.data.possibleAnswers);
    }

    // initialise state when task data changes
    useEffect(() => {
        resetTask();
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
                resetTask();
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
        // return if user drags elem out of bounds
        if (!result.destination) return;
        const updatedOrder = [...order];
        const [updatedItem] = updatedOrder.splice(result.source.index, 1);
        updatedOrder.splice(result.destination.index, 0, updatedItem);
        setOrder(updatedOrder);
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

    let addToOrder = (frag) => {
        setOrder(order.concat([frag]));
        setPossibleFrags(possibleFrags.filter(elem => {
            return elem != frag;
        }));
    }
    let removeFromOrder = (frag) => {
        setOrder(order.filter(elem => {
            return elem != frag;
        }));
        setPossibleFrags(possibleFrags.concat([frag]));
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
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                        >
                            { order.map((data, index) => 
                                <DragAnswerFragment 
                                    possible={data}
                                    key={index}
                                    index={index}
                                    removeFromOrder={removeFromOrder}
                                />
                            ) }
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            
            <div id="possible-fragments">
                <ul className="possiblities-wrap">
                    {possibleFrags.map((data, index) => 
                        <PossAnswerFragment 
                            possible={data}
                            key={index}
                            index={index}
                            addToOrder={addToOrder}
                        />
                    )}
                </ul>
            </div>

            <div onClick={()=>{
                checkAnswer();
            }}>
                Submit &gt;
            </div>
        </div>
    );
}

export default SpecifiedOrder;