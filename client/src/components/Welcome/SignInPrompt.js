import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useSpring, animated } from 'react-spring';

// component imports
import SignInButton from "./SignInButton";
import TranslationsScroller from "./TranslationsScroller";

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
            id="" 
            className="animate-fade-in z-10 w-4/5 pr-14 absolute top-[45%] pl-4"
            style={spring}
        >
            {/* <TranslationsScroller timeout={2000} /> */}
            <animated.div 
                id="" 
                className={`text-2xl md:text-3xl tracking-wider font-normal`}
                style={spring}
            >
                <span className="font-bold">Want to</span> learn a new language?
            </animated.div>
            <animated.div 
                id="" 
                className="text-3xl md:text-4xl tracking-wider mt-6 pb-2 border-b-2 border-white w-48 md:w-56
                    cursor-pointer transition-all hover:text-primary hover:border-primary"
                style={spring}
                onClick={props.handleClick}
            >
                Let's Go &gt;
            </animated.div>
            {/* <SignInButton 
                buttonState={buttonState}
                onClick={props.handleClick}
            /> */}
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