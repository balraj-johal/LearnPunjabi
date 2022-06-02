import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useSpring, animated } from 'react-spring';
import TypeAnimation from 'react-type-animation';

// component imports
import SignInButton from "./SignInButton";
import TranslationsScroller from "./TranslationsScroller";

const TYPING_SEQUENCE_TIME = 3500;
const DELAY = 1000;
const TYPING_SEQUENCE = [
    'learn a new language?',
    TYPING_SEQUENCE_TIME,
    DELAY,
    'recconect with your heritage?',
    TYPING_SEQUENCE_TIME,
    DELAY,
]

function SignInPrompt(props) {
    let navigate = useNavigate();
    let [buttonState, setButtonState] = useState("not ready");

    useEffect(() => {
        if (!props.auth.hasChecked) return;
        if (props.auth.isAuthenticated) return setButtonState("authorised");
        return setButtonState("unauthorised");
    }, [props.auth])

    const spring = useSpring({
        from: { opacity: 0 },
        to: { opacity: buttonState === "not ready" ? 0 : 1 },
    });

    return(
        <animated.div 
            className="animate-fade-in z-0 w-4/5 md:w-3/5 pr-14 
                absolute top-[45%] pl-4"
            style={spring}
        >
            <animated.div 
                className="text-2xl md:text-3xl tracking-wide font-normal h-20"
                style={spring}
            >
                <span className="font-bold">Want to </span>  
                <TypeAnimation
                    wrapper="span"
                    sequence={TYPING_SEQUENCE}
                    cursor={true}
                    repeat={Infinity}
                />
            </animated.div>
            <animated.div 
                id="" 
                className="text-3xl md:text-4xl tracking-wide mt-6 pb-2 pl-4 pt-4
                    border-b-2 border-white w-48 md:w-60
                    cursor-pointer transition-all z-0
                    hover:text-white hover:border-primary hover:bg-primary"
                style={spring}
                onClick={props.handleClick}
            >
                Let's Go &gt;
            </animated.div>
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