import React, { useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated } from 'react-spring';
import { useNavigate } from "react-router-dom";

import axiosClient from "../../axiosDefaults";
import qs from 'qs';

import { loginUser, setUser, setAuthErrors } from "../../actions/authActions";

// form components
import FormError from "../FormComponents/FormError";
import FormInput from "../FormComponents/FormInput";
import FormSubmitButton from "../FormComponents/FormSubmitButton";

function Login(props) {
    let navigate = useNavigate();
    // initialise form states
    let [submitting, setSubmitting] = useState(false);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const spring = useSpring({ 
        to: { opacity: 1 }, 
        from: { opacity: 0 }, 
        delay: 200,
    });

    let onSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axiosClient.post("/api/v1/users/login", 
                qs.stringify({ username: username, password: password }));
            await props.setUser();
            navigate("/dashboard");
        } catch (error) {
            props.setAuthErrors(error.response.data);
            setSubmitting(false);
        }
    }

    return(
        <animated.div 
            role="tabpanel"
            aria-labelledby="tab-Login"
            className="login mt-2" 
            style={spring}
        >
            <form className="login-form" noValidate onSubmit={onSubmit}>
                <h1 className="visually-hidden">Login</h1>
                <div className="visually-hidden" aria-live="polite">
                    <h2>Form Errors</h2>
                    {Object.values(props.errors).map(error => (
                        <p key={error}>{error}</p>
                    ))}
                </div>
                <FormInput 
                    for="username"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    errors={props.errors}
                    type="username"
                    required={true}
                    labelOverride="Username/Email"
                />
                <FormInput 
                    for="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    errors={props.errors}
                    required={true}
                    type="password"
                    autoComplete="current-password"
                />
                <FormError 
                    for="verification" 
                    errors={props.errors} 
                />
                <FormSubmitButton for="login" disabled={submitting} />
                <a 
                    tabIndex={0}
                    onClick={() => { props.setManagerState("ForgotPassword") }}
                    className="text-sm text-primary w-2/5 cursor-pointer mt-4 block
                        hover:text-secondary hover:translate-x-2 transition-all
                        underline"
                >
                    - Forgot Password?
                </a>
            </form>
        </animated.div>
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