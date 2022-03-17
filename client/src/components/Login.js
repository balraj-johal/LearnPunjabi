import React, { useState } from "react";
import { connect } from "react-redux";

import { loginUser } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInputField from "./FormComponents/FormInputField";
import FormSubmitButton from "./FormComponents/FormSubmitButton";

function Login(props) {
    // initialise form states
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    let onSubmit = e => {
        e.preventDefault();
        props.loginUser({
            username: username,
            password: password
        });
    }

    return(
        <div className="login">
            <h2>Login</h2>
            <form className="login-form" noValidate onSubmit={ onSubmit }>
                <FormInputField 
                    dataElem="username"
                    onChange={ e => setUsername(e.target.value) }
                    value={ username }
                    error={ props.errors.username }
                    type="username"
                />
                <FormError 
                    dataElem="username" 
                    errors={ props.errors } 
                />
                <FormInputField 
                    dataElem="password"
                    onChange={ e => setPassword(e.target.value) }
                    value={ password }
                    error={ props.errors.password }
                    type="password"
                />
                <FormError 
                    dataElem="password" 
                    errors={ props.errors } 
                />
                <FormError 
                    dataElem="verification" 
                    errors={ props.errors } 
                />
                <FormSubmitButton dataElem="login" />
                <div onClick={() => {
                    props.setManagerState("ForgotPassword");
                }}>
                    Forgot Password?
                </div>
            </form>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.auth.errors
});

//connect to redux
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);