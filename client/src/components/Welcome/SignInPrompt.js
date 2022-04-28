import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignInButton from "./SignInButton";
import TranslationsScroller from "./TranslationsScroller";

function SignInPrompt(props) {
    let navigate = useNavigate();
    let [buttonState, setButtonState] = useState("not ready")

    useEffect(() => {
        if (!props.auth.hasChecked) return;
        if (props.auth.isAuthenticated) return setButtonState("authorised");
        return setButtonState("unauthorised");
    }, [props.auth])

    return(
        <div id="middle-bit">
            <TranslationsScroller timeout={2000} />
            <div id="prompt-text">Learn Punjabi quickly and effectively using our intuitive learning system.</div>
            <SignInButton 
                buttonState={buttonState}
                onClick={() => { 
                    if (props.loggedIn) return navigate("/dashboard"); 
                    navigate("/account");
                }}
            />
        </div>
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