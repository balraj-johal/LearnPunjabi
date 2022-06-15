import React, { useState } from "react";
import { connect } from "react-redux";

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
            <div className={`relative mx-auto flex flex-col justify-center items-center ${props.animClasses}`} >
                <DrawingCanvas clearing={clearing} setClearing={setClearing} />
                <button className="w-full text-white h-8 bg-primary cursor-pointer mt-[-1px]
                    hover:bg-secondary capitalize transition-all duration-75 border-b border-x border-black" 
                    onClick={()=>{ setClearing(true) }}
                >Clear</button>
            </div>
            <NextButton next={() => {checkAnswer()}} text="Check Answer" />
        </div>
    );
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    animClasses: state.currTask.animClasses
});

export default connect(
    mapStateToProps,
    {  }
)(DrawLetter);