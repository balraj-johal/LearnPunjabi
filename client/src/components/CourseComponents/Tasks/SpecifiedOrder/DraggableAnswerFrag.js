import React, { useState } from "react";
import { Draggable } from 'react-beautiful-dnd';

let DraggableAnswerFrag = React.forwardRef((props, ref) => {
    // if animating is 1, css animation fadeIn is triggered
    let [animating, setAnimating] = useState(props.animating ? "1" : "0");
    
    /** handle animation cleanup
     * @name onAnimEnd
     */
    let onAnimEnd = () => {
        setAnimating("0"); 
        props.removeAnimatingFrag(props.possible);
    }
    
    /** Implements answer focus changing using arrow keys
     * @name handleKeyDown
     * @param {Object} e - key event
     */
     let handleKeyDown = (e) => {
        switch (e.keyCode) {
            case 37:
                props.handleArrowKeys("left");
                break;
            case 39: 
                props.handleArrowKeys("right");
                break;
            case 38:
                props.handleArrowKeys("down");
                break;
            case 40:
                props.handleArrowKeys("down");
                break;
            default:
                break;
        }
    }


    return(
        <Draggable draggableId={String(props.index)} index={props.index} >
            {(provided) => (
                <button
                    ref={ref}
                    className="specified-order-answer answer dark-answer"
                    data-testid="selected-answer"
                    // ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => {
                        props.removeFromOrder(props.possible);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {props.setFocusTargetData({
                        onPossibleList: false,
                        index: props.index
                    })}}
                    animating={animating}
                    onAnimationEnd={() => { onAnimEnd() }}
                >
                    {props.possible.text}
                </button>
            )}
        </Draggable>
    )
})

export default DraggableAnswerFrag;