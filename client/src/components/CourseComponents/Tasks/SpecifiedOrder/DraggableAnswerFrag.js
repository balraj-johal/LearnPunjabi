import React, { useState } from "react";
import { Draggable } from 'react-beautiful-dnd';

function DraggableAnswerFrag(props) {
    // if animating is 1, css animation fadeIn is triggered
    let [animating, setAnimating] = useState(props.animating ? "1" : "0");
    
    /** handle animation cleanup
     * @name onAnimEnd
     */
    let onAnimEnd = () => {
        setAnimating("0"); 
        props.removeAnimatingFrag(props.possible);
    }


    return(
        <Draggable draggableId={String(props.index)} index={props.index} >
            {(provided) => (
                <button
                    className="specified-order-answer answer dark-answer"
                    data-testid="selected-answer"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => {
                        props.removeFromOrder(props.possible);
                    }}
                    animating={animating}
                    onAnimationEnd={() => { onAnimEnd() }}
                >
                    { props.possible.text ? (
                        <div className="text">{props.possible.text}</div>
                    ) : null }
                </button>
            )}
        </Draggable>
    )
}

export default DraggableAnswerFrag;