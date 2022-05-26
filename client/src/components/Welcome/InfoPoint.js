import React, {  } from "react";
import { connect } from "react-redux";

import Lottie from "react-lottie-player";
import girlLooking from "../../res/animations/girl_looking.json";

function InfoPoint(props) {
    return(
        <div 
            id={`info-point-${props.index}`} 
            className={`info-point flex w-11/12 md:w-7/12 z-10`} 
        >
            <div className="hero-icon w-4/12 mr-4 relative 
                flex items-center justify-center">
                <Lottie 
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                    className={`w-full h-[100px] md:h-[150px] mt-[-10px] absolute`}
                    animationData={girlLooking} 
                    loop 
                    play 
                />
            </div>
            <div className="w-8/12">
                <div className="title text-lg md:text-xl lg:text-2xl">
                    {props.title}
                </div>
                <div className="text font-normal mt-4 text-md
                    md:text-lg lg:text-xl md:pr-0 pr-10"
                >
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