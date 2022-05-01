import React, {} from "react";

function PossAnswerFragment(props) {
    return(
        <li className={`specified-order-answer answer`} onClick={() => {
            props.addToOrder(props.possible);
        }}>
            { props.possible ? (
                <div className="text"> {props.possible.text} </div>
            ) : null }
        </li>
    )
}

export default PossAnswerFragment;