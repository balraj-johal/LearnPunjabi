import React, {  } from "react";
import NextButton from "./NextButton";

function Intersitial(props) {
    return(
        <>
            <div className="lesson-interstitial flex flex-col items-center 
                h-5/6 justify-center">
                <span>{props.data.text}</span>
                <span className="my-8">
                    Good job! You're doing great!
                </span>
            </div>
            <NextButton next={()=>{ props.submit(true) }} />
        </>
    );
}

export default Intersitial;