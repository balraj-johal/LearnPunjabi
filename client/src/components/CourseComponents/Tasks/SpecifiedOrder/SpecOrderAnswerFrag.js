import React, { useState } from "react";

function SpecOrderAnswerFrag(props) {
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
        <button 
            className={`specified-order-answer answer dark-answer`} 
            onClick={() => { props.addToOrder(props.possible) }}
            animating={animating}
            onAnimationEnd={() => { onAnimEnd() }}
        >
            <div className="text">
                {props.possible.text}
            </div>
        </button>
    )
}

export default SpecOrderAnswerFrag;