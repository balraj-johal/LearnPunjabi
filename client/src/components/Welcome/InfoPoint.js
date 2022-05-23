import React, { useRef } from "react";
import { connect } from "react-redux";
import { useInViewport } from 'react-in-viewport';

import Lottie from "react-lottie-player";
import girlLooking from "../../res/animations/girl_looking.json";

function InfoPoint(props) {
    const ref = useRef();
    const { inViewport } = useInViewport( ref );

    return(
        <div 
            id={`info-point-${props.index}`} 
            className={`info-point flex w-11/12 md:w-7/12 z-10 animDelay500
                ${inViewport ? "fadeIn" : "opacity-0"}`} 
            ref={ref} 
        >
            <div className="hero-icon w-4/12 mr-4 relative 
                flex items-center justify-center">
                <Lottie 
                    rendererSettings={{ 
                        preserveAspectRatio: 'xMidYMid slice' 
                    }} 
                    className={`w-full h-[100px] absolute`}
                    animationData={girlLooking} 
                    loop 
                    play 
                />
            </div>
            <div className="w-8/12">
                <div className="title text-xl md:text-2xl">
                    {props.title}
                </div>
                <div className="text font-normal mt-4 text-md
                    md:text-xl md:pr-0 pr-10">
                    {props.mobile ? props.textShort : props.text}
                </div>
            </div>
        </div> 
    )
}

const mapStateToProps = state => ({
    mobile: state.display.mobile,
});

export default connect(
    mapStateToProps,
    {  }
)(InfoPoint);