import React, {  } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../Buttons/ActionButton";
import TranslationsScroller from "./TranslationsScroller";

function SignInPrompt(props) {
    let navigate = useNavigate();

    return(
        <div id="middle-bit">
            <TranslationsScroller timeout={2000} />
            <div id="prompt-text">Learn Punjabi quickly and effectively using our intuitive learning system.</div>
            <ActionButton text="Sign In" onClick={() => {
                navigate("/account");
            }}/>
        </div>
    )
}

export default SignInPrompt;