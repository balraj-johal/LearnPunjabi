import React, { useState } from "react";

import DrawingCanvas from "./DrawingCanvas";
import NextButton from "../NextButton";

function DrawLetter(props) {
    let [clearing, setClearing] = useState(false);

    let submitAnswer = () => {
        setClearing(true);
        props.submit(true);
    }

    return(
        <div className="task px-2 animate-fade-in w-11/12 md:w-7/12 draw-letter">
            <div className="mb-8">{ props.data.text }</div>
            <DrawingCanvas clearing={clearing} setClearing={setClearing} />
            <div className="flex flex-row w-full my-4">
                <NextButton next={() => {setClearing(true)}} text="Clear" />
                <NextButton next={() => {submitAnswer()}} />
            </div>
        </div>
    );
}

export default DrawLetter;