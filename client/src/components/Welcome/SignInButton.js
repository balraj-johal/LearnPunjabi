import React, { useEffect } from "react";

function SignInButton(props) {

    return(
        <div 
            className={`${ props.buttonState === "not ready" ? 
                "opacity-0 invisible" : "opacity-100" }
                action-button transition-all duration-500
                `} 
            onClick={props.onClick}
        >
            {props.buttonState === "authorised" ? "Enter" : "Sign In"}
        </div>
    )
}

export default SignInButton;