import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DragAnswerFragment from "./DragAnswerFragment";
import PossAnswerFragment from "./PossAnswerFragment";
import AudioClip from "../../AudioClip";
import NextButton from "../NextButton";

function SpecifiedOrder(props) {
    let [order, setOrder] = useState([]);
    let [possibleFrags, setPossibleFrags] = useState([]);
    let [animatingFrags, setAnimatingFrags] = useState([]);

    /** resets task state
     *  @name resetTask
     */
    let resetTask = useCallback(() => {
        setOrder([]);
        setPossibleFrags(props.data.possibleAnswers);
    })
    // initialise state when task data changes
    useEffect(() => {
        resetTask();
    }, [props.data]);

    /** check if the submitted answer is correct and handle consequences
     * @name checkAnswer
     */
    let checkAnswer = () => {
        if (getAnswerString().includes(props.data.correctAnswer)) {
            props.handleCorrect();
        } else {
            props.handleWrong();
            resetTask();
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
    /** Adds specified fragment to user's answer
     * @name addToOrder
     * @param {Object} frag - answer fragment
     */
    let addToOrder = (frag) => {
        setOrder(order.concat([frag]));
        setPossibleFrags(possibleFrags.filter(elem => {
            return elem !== frag;
        }));
        setAnimatingFrags(animatingFrags.concat([frag]));
    }

    /** Removes specified fragment from user's answer
     * @name removeFromOrder
     * @param {Object} frag - answer fragment
     */
    let removeFromOrder = (frag) => {
        setOrder(order.filter(elem => {
            return elem !== frag;
        }));
        setPossibleFrags(possibleFrags.concat([frag]));
        setAnimatingFrags(animatingFrags.concat([frag]));
    }

    /** Removes specified fragment from animating list
     * @name removeAnimatingFrag
     * @param {Object} frag - answer fragment
     */
    let removeAnimatingFrag = (frag) => {
        setAnimatingFrags(animatingFrags.filter(elem => {
            return elem !== frag;
        }));
    }

    return(
        <>
            <div className={`specified-order min-h-[40vh] h-5/6 
                flex flex-col justify-center`} 
            >
                <div className="title w-full h-1/6 md:h-2/6 px-0
                    flex flex-row justify-start items-center"
                >
                    <AudioClip src={props.data.audioLink} />
                    <span className={`pr-[30%] lg:text-xl
                        ${props.data.audioLink ? "ml-4 md:ml-10" : ""}`}
                    >
                        { props.data.text }
                    </span>
                </div>
                <div id="lists" className={`${props.animClasses}`}>
                    <DragDropContext onDragEnd={handleDragEnd} >
                        <Droppable 
                            droppableId="characters" 
                            direction="horizontal"
                            renderClone={(provided, snapshot, rubric) => (
                                <div
                                    className={`w-2 rounded border-[1px] border-bg-primary 
                                        flex justify-center items-center`}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    {order[rubric.source.index].text}
                                </div>
                            )}
                        >
                            {(provided) => (
                                <ul 
                                    id="answers"
                                    {...provided.droppableProps} 
                                    ref={provided.innerRef}
                                >
                                    { order.map((data, index) => 
                                        <DragAnswerFragment 
                                            animating={animatingFrags.includes(data)}
                                            removeAnimatingFrag={removeAnimatingFrag}
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
                        <ul className="possiblities-wrap" id="possibilites">
                            {possibleFrags.map((data, index) => 
                                <PossAnswerFragment 
                                    animating={animatingFrags.includes(data)}
                                    removeAnimatingFrag={removeAnimatingFrag}
                                    possible={data}
                                    key={index}
                                    index={index}
                                    addToOrder={addToOrder}
                                />
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <NextButton next={() => {checkAnswer()}} />
        </>
    );
}


//pull relevant props from redux state
const mapStateToProps = state => ({
    animClasses: state.currTask.animClasses
});

export default connect(
    mapStateToProps,
    {
    }
)(SpecifiedOrder);