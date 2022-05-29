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
            id="middle-bit" 
            className="animate-fade-in"
            style={spring}
        >
            <TranslationsScroller timeout={2000} />
            <animated.div 
                id="prompt-text" 
                className={`text-base md:text-lg lg:text-xl`}
                style={spring}
                // ${buttonState !== "not ready" ? "" : "opacity-0"}
            >
                Want to learn a new language? Or want to be able to talk to your grandparents?
                Learn Punjabi quickly and effectively here!
            </animated.div>
            <SignInButton 
                buttonState={buttonState}
                onClick={() => { 
                    if (props.loggedIn) return navigate("/dashboard"); 
                    navigate("/account");
                }}
            />
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