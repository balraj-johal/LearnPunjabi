import React, {  } from "react";
import NextButton from "./NextButton";

function Intersitial(props) {
    return(
        <div className="lesson-interstitial flex flex-col items-center h-full justify-center pb-20">
            <span>{props.data.text}</span>
            <span className="my-8">
                Good job! You're doing great!
            </span>
            <NextButton next={()=>{ props.submit(true) }} />
        </div>
    );
}

export default Intersitial;