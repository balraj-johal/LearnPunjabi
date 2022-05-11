import React, { useState } from "react";

import DrawingCanvas from "./DrawingCanvas";
import NextButton from "../NextButton";

function DrawLetter(props) {
    let [clearing, setClearing] = useState(false);

    /** check if the submitted answer is correct and handle consequences
     * @name checkAnswer
     */
    let checkAnswer = () => {
        setClearing(true);
        props.handleCorrect();
    }

    return(
        <div className="draw-letter">
            <div className="mb-8">{ props.data.text }</div>
            <DrawingCanvas clearing={clearing} setClearing={setClearing} />
            <div className="flex flex-row w-full my-4">
                <NextButton next={() => {setClearing(true)}} text="Clear" />
                <NextButton next={() => {checkAnswer()}} />
            </div>
        </div>
    );
}

export default DrawLetter;