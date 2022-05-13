import React, { useState } from "react";

import DrawingCanvas from "./DrawingCanvas";
import NextButton from "../NextButton";
import GenericButton from "../../../GenericButton";

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
        <div className="draw-letter h-full flex flex-col justify-center">
            <div className="title absolute top-2 left-3">{ props.data.text }</div>
            <div className="relative mx-auto flex flex-col justify-center items-center" >
                <DrawingCanvas clearing={clearing} setClearing={setClearing} />
                <button className="w-full text-white h-8 bg-primary cursor-pointer mt-[-1px]
                    hover:bg-primary2 capitalize transition-all duration-75 border-b border-x border-black" 
                    onClick={()=>{ setClearing(true) }}
                >Clear</button>
            </div>
            <NextButton next={() => {checkAnswer()}} />
        </div>
    );
}

export default DrawLetter;