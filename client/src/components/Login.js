import React, { useState } from "react";
import { connect } from "react-redux";

import axiosClient from "../axiosDefaults";
import qs from 'qs';

import { loginUser, setUser, setAuthErrors } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInput from "./FormComponents/FormInput";
import FormSubmitButton from "./FormComponents/FormSubmitButton";

function Login(props) {
    // initialise form states
    let [submitting, setSubmitting] = useState(false);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    let onSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axiosClient.post("/api/v1/users/login", 
                qs.stringify({ username: username, password: password }));
            props.setUser();
        } catch (error) {
            props.setAuthErrors(error.response.data);
            setSubmitting(false);
        }
    }

    return(
        <div className="login mt-2">
            <form className="login-form" noValidate onSubmit={ onSubmit }>
                <FormInput 
                    for="username"
                    onChange={ e => setUsername(e.target.value) }
                    value={ username }
                    errors={ props.errors }
                    type="username"
                />
                <FormInput 
                    for="password"
                    onChange={ e => setPassword(e.target.value) }
                    value={ password }
                    errors={ props.errors }
                    type="password"
                />
                <FormError 
                    for="verification" 
                    errors={ props.errors } 
                />
                <FormSubmitButton for="login" disabled={submitting} />
                <div 
                    onClick={() => { props.setManagerState("ForgotPassword"); }}
                    className="text-sm text-primary w-full"    
                >
                    - Forgot Password?
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
    { loginUser, setUser, setAuthErrors }
)(Login);