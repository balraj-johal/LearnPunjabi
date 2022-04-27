import React from "react";

function ActionButton(props) {
    return(
        <div className="action-button" onClick={props.onClick}>
            {props.text}
        </div>
    )
}

export default ActionButton;