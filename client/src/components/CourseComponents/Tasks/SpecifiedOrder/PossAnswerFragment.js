import React, { useState } from "react";

function PossAnswerFragment(props) {
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
        <li 
            className={`specified-order-answer answer`} 
            onClick={() => { props.addToOrder(props.possible) }}
            animating={animating}
            onAnimationEnd={() => { onAnimEnd() }}
        >
            <div className="text"> {props.possible.text} </div>
        </li>
    )
}

export default PossAnswerFragment;