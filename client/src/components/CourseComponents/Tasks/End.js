import React, {  } from "react";
import Lottie from "react-lottie-player";
import NextButton from "./NextButton";

import confetti from "../../../res/animations/confetti.json";

function End(props) {
    return(
        <>
            <Lottie 
                rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} 
                className="w-full h-full absolute top-0 left-0 z-0 
                    pointer-events-none"
                animationData={confetti} 
                speed={0.8}
                play 
                loop={false}
                delay={200}
            />
            <div className="lesson-end flex flex-col items-center 
                h-5/6 justify-center">
                <span>{props.data.text}</span>
                { props.data.showPercentCorrect && (
                    <span className="mt-8">
                        You got {props.stats} of your answers correct!
                    </span>
                ) }
            </div>
            {!props.hideButton && 
                <NextButton next={()=>{ props.submit(true) }} text="Finish" />}
        </>
    );
}

export default End;