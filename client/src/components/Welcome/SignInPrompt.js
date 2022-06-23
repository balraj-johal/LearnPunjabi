import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated } from 'react-spring';
import TypeAnimation from 'react-type-animation';

// // component imports

const TYPING_SEQUENCE_TIME = 3500;
const TYPING_SEQUENCE = [
    'learn a new language?',
    TYPING_SEQUENCE_TIME,
    'reconnect with your heritage?',
    TYPING_SEQUENCE_TIME,
    'take on a new challenge?',
    TYPING_SEQUENCE_TIME,
]

function SignInPrompt(props) {
    let [buttonState, setButtonState] = useState("not ready");

    useEffect(() => {
        if (!props.auth.hasChecked) return;
        return setButtonState("ready");
    }, [props.auth])

    const spring = useSpring({
        from: { opacity: 0 },
        to: { opacity: buttonState === "not ready" ? 0 : 1 },
    });

    return(
        <animated.div 
            className="animate-fade-in z-0 w-4/6 top-[40%]
                pl-4 pr-4
                md:w-3/5 md:pr-12 md:pl-12 md:top-[45%] 
                lg:pl-24
                xl:w-3/6
                absolute flex flex-col"
            style={spring}
        >
            <animated.div 
                className="text-2xl md:text-4xl tracking-wide font-normal h-20
                    w-full text-left md:pr-24 relative"
                style={spring}
            >
                <span className="">Want to </span>  
                <TypeAnimation
                    wrapper="span"
                    sequence={TYPING_SEQUENCE}
                    cursor={true}
                    repeat={Infinity}
                />
            </animated.div>
            <animated.button 
                className="text-lg tracking-wide pb-1 pt-2 pl-4 mt-8 w-full
                    md:text-2xl md:w-4/5 md:mt-10 md:pb-2 md:pt-3
                    border-b-2 border-white bg-white text-black
                    cursor-pointer transition-all z-0 font-normal
                    hover:text-white hover:border-primary hover:bg-primary
                    hover:font-bold relative text-left"
                style={spring}
                onClick={props.handleClick}
            >
                Start Learning &gt;
            </animated.button>
        </animated.div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {  }
)(SignInPrompt);