import React, {  } from "react";
import Lottie from "react-lottie-player";
import NextButton from "./NextButton";

import confetti from "../../../res/animations/confetti.json";

function End(props) {
    return(
        <>
            <Lottie 
                rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} 
                className={`w-full h-full absolute z-10 pointer-events-none`}
                animationData={confetti} 
                play 
                loop={false}
            />
            <div className="lesson-end flex flex-col items-center 
                h-full justify-center pb-20">
                <span>{props.data.text}</span>
                {props.data.showPercentCorrect ? (
                    <span className="my-8">
                        You got {props.stats} of your answers correct!
                    </span>
                ) : null }
                <NextButton next={()=>{ props.submit(true) }} />
            </div>
        </>
    );
}

export default End;