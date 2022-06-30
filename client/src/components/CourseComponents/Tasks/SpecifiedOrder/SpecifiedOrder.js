import React, { useCallback, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import DraggableAnswerFrag from "./DraggableAnswerFrag";
import SpecOrderAnswerFrag from "./SpecOrderAnswerFrag";
import NextButton from "../NextButton";
import TaskHeader from "../TaskHeader";

function SpecifiedOrder(props) {
    let focusTarget = useRef();
    let [focusTargetData, setFocusTargetData] = useState({
        onPossibleList: true,
        index: 0
    });
    let [chosenFrags, setChosenFrags] = useState([]);
    let [possibleFrags, setPossibleFrags] = useState([]);
    let [animatingFrags, setAnimatingFrags] = useState([]);

    /** resets task state
     *  @name resetTask
     */
    let resetTask = useCallback(() => {
        setChosenFrags([]);
        setPossibleFrags(props.data.possibleAnswers);
    }, [props.data])
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
            resetTask();
            props.handleWrong();
            setFocusTargetData({
                onPossibleList: true,
                index: 0
            });
        }
    }

    /**
     * update the stored list state when an element has been dragged
     * @name handleDragEnd
     */
    let handleDragEnd = () => {
    }

    /**
     * get the string containing the current answer state
     * @name getAnswerString
     * @returns {String} - string containing current order's text concatenated together
     */
    let getAnswerString = () => {
        let str = "";
        chosenFrags.forEach(elem => {
            str += elem.text
        })
        return str;
    }

    /** Adds specified fragment to user's answer
     * @name addToOrder
     * @param {Object} frag - answer fragment
     */
    let addToOrder = (frag) => {
        setChosenFrags(chosenFrags.concat([frag]));
        setPossibleFrags(possibleFrags.filter(elem => {
            return elem !== frag;
        }));
        setAnimatingFrags(animatingFrags.concat([frag]));
        shiftFocusBack();
    }

    /** Removes specified fragment from user's answer
     * @name removeFromOrder
     * @param {Object} frag - answer fragment
     */
    let removeFromOrder = (frag) => {
        setChosenFrags(chosenFrags.filter(elem => {
            return elem !== frag;
        }));
        setPossibleFrags(possibleFrags.concat([frag]));
        setAnimatingFrags(animatingFrags.concat([frag]));
        shiftFocusBack();
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
    
    /**
     * Implements keyboard controls by updating which answer has the focus target ref
     * @name updateFocus
     * @param {String} direction - "left" or "right"
     */
    let handleArrowKeys = (direction) => {
        let newIndex = 0;
        switch (direction) {
            case "left":
                newIndex = focusTargetData.index -= 1;
                if (newIndex < 0) {
                    if (focusTargetData.onPossibleList) {
                        newIndex = possibleFrags.length - 1;
                    } else {
                        newIndex = chosenFrags.length - 1;
                    }
                }
                setFocusTargetData({...focusTargetData, index: newIndex});
                break;
            case "right":
                newIndex = focusTargetData.index += 1;
                if (focusTargetData.onPossibleList) {
                    if (newIndex > possibleFrags.length - 1) newIndex = 0;
                    setFocusTargetData({...focusTargetData, index: newIndex});
                } else {
                    if (newIndex > chosenFrags.length - 1) newIndex = 0;
                    setFocusTargetData({...focusTargetData, index: newIndex});
                }
                break;
            case "down":
                switchFocusBetweenLists();
                break;
            case "up":
                switchFocusBetweenLists();
                break;
            default:
                break;
        }
    }

    let switchFocusBetweenLists = () => {
        if (possibleFrags.length < 1) return;
        if (chosenFrags.length < 1) return;
        setFocusTargetData({
            onPossibleList: !focusTargetData.onPossibleList, 
            index: 0
        })
    }

    // if focused list is empty, switch focus to other list
    useEffect(() => {
        if (possibleFrags.length < 1) setFocusTargetData({
            onPossibleList: false, 
            index: 0
        })
    }, [possibleFrags])
    useEffect(() => {
        if (chosenFrags.length < 1) setFocusTargetData({
            onPossibleList: true, 
            index: 0
        })
    }, [chosenFrags])

    /**
     * on each change to a task answer list, 
     * move focus back to the preceeding answer fragment
     * @name shiftFocusBack
     */
    let shiftFocusBack = () => {
        let newIndex = focusTargetData.index -= 1;
        console.log(possibleFrags)
        if (newIndex < 0) {
            newIndex = 0;
        } else {
            setFocusTargetData({
                ...focusTargetData, 
                index: newIndex
            });
        };
    }
    // when focus target changes, focus on that element
    useEffect(() => {
        if (!focusTarget.current) return;
        focusTarget.current.focus();
    }, [focusTargetData])

    return(
        <>
            <div 
                data-testid="spec-order"
                className={`specified-order 
                    min-h-[40vh] h-5/6 
                    flex flex-col justify-center`} 
            >
                <TaskHeader data={props.data} />
                <div id="lists" className={`${props.animClasses}`}>
                    <ol 
                        id="answers"
                        aria-label="selected-answers"
                        aria-live="polite"
                    >
                        { chosenFrags.map((data, index) => 
                            <DraggableAnswerFrag 
                                ref={!focusTargetData.onPossibleList 
                                    && focusTargetData.index === index ? focusTarget : null}
                                handleArrowKeys={handleArrowKeys}
                                setFocusTargetData={setFocusTargetData}
                                animating={animatingFrags.includes(data)}
                                removeAnimatingFrag={removeAnimatingFrag}
                                possible={data}
                                key={index}
                                index={index}
                                removeFromOrder={removeFromOrder}
                            />
                        ) }
                    </ol>
                    <div id="possible-fragments">
                        <ol 
                            className="possiblities-wrap" 
                            id="possibilites"
                            aria-label="possible-answers"
                            aria-live="polite"
                        >
                            {possibleFrags.map((data, index) => 
                                <SpecOrderAnswerFrag 
                                    ref={focusTargetData.onPossibleList 
                                        && focusTargetData.index === index ? focusTarget : null}
                                    animating={animatingFrags.includes(data)}
                                    removeAnimatingFrag={removeAnimatingFrag}
                                    handleArrowKeys={handleArrowKeys}
                                    setFocusTargetData={setFocusTargetData}
                                    possible={data}
                                    key={index}
                                    index={index}
                                    addToOrder={addToOrder}
                                />
                            )}
                        </ol>
                    </div>
                </div>
            </div>
            <NextButton next={() => { checkAnswer() }} text="Check Answer" />
        </>
    );
}


//pull relevant props from redux state
const mapStateToProps = state => ({
    animClasses: state.currTask.animClasses,
    vh: state.display.singleVH,
});

export default connect(
    mapStateToProps,
    {}
)(SpecifiedOrder);