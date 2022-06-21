import React, {  } from "react";

function SignInButton(props) {

    return(
        <div 
            className={`hover:bg-secondary
                ${ props.buttonState === "not ready" ? 
                    "opacity-0 invisible" : "opacity-100" }
                action-button transition-all`} 
            onClick={props.onClick}
        >
            {props.buttonState === "authorised" ? "Enter" : "Sign In"}
        </div>
    )
}

export default SignInButton;