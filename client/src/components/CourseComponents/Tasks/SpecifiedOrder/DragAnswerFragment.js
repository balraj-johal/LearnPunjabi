import React, {} from "react";
import { Draggable } from 'react-beautiful-dnd';

function DragAnswerFragment(props) {
    return(
        <Draggable draggableId={String(props.index)} index={props.index} >
            {(provided) => (
                <li
                    className={`specified-order-answer answer`}
                    ref={provided.innerRef}
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    onClick={() => {
                        props.removeFromOrder(props.possible);
                    }}
                >
                    { props.possible.text ? (
                        <div className="text"> {props.possible.text} </div>
                    ) : null }
                </li>
            )}
        </Draggable>
    )
}

export default DragAnswerFragment;