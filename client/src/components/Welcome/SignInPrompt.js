import React, {  } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../Buttons/ActionButton";

function SignInPrompt(props) {
    let navigate = useNavigate();

    return(
        <div id="middle-bit">
            <div id="examples-scroller">
                <div id="punjabi">ਪੰਜਾਬੀ ਸਿੱਖੋ</div>
                <div id="translation">- punjabi sikho</div>
            </div>
            <div id="prompt-text">Learn Punjabi quickly and effectively using our intuitive learning system.</div>
            <ActionButton text="Sign In" onClick={() => {
                navigate("/account");
            }}/>
        </div>
    )
}

export default SignInPrompt;