import React, { useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated, config } from 'react-spring';

import { registerUser } from "../../actions/authActions";

import axiosClient from "../../axiosDefaults";
import qs from 'qs';

// form components
import FormError from "../FormComponents/FormError";
import FormInput from "../FormComponents/FormInput";
import FormSubmitButton from "../FormComponents/FormSubmitButton";

function Register(props) {
    // initalise form state
    let [submitting, setSubmitting] = useState(false);
    let [successful, setSuccessful] = useState(false);
    let [fadeOut, setFadeOut] = useState(false);
    let [errors, setErrors] = useState({});

    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    const spring = useSpring({ 
        to: { opacity: fadeOut ? 0 : 1 }, 
        from: { opacity: 0 }, 
        delay: 100,
    });

    let onSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        let formData = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            email: email,
        }
        try {
            await axiosClient.post("/api/v1/users/", qs.stringify(formData));
            setSubmitting(false);
            // begin transition to success component
            setFadeOut(true);
            setTimeout(() => {
                setFadeOut(false);
                setSuccessful(true);
            }, 500);
        } catch (error) {
            setErrors(error.response.data);
            setSubmitting(false);
        }
    }

    return(
        <animated.div 
            role="tabpanel"
            aria-labelledby="tab-Register"
            className="register relative" 
            style={spring} 
        >
            { successful ? (
                <RegistrationSuccess />
            ) : (
                <form className="register-form" noValidate onSubmit={onSubmit} >
                    <h1 className="visually-hidden">Register</h1>
                    <div className="visually-hidden" aria-live="polite">
                        <h2>Form Errors</h2>
                        {Object.values(errors).map(error => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                    <FormInput 
                        for="username"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        required={true}
                        errors={errors}
                        type="username"
                    />
                    <FormInput 
                        for="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required={true}
                        errors={errors}
                        type="text"
                        autoComplete="email"
                    />
                    <FormInput 
                        for="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required={true}
                        errors={errors}
                        type="password"
                        autoComplete="new-password"
                    />
                    <FormInput 
                        for="confirmPassword"
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required={true}
                        errors={errors}
                        type="password"
                    />
                    <FormError for="registration" errors={errors} />
                    <FormSubmitButton for="register" disabled={submitting} />
                </form>
            ) }
        </animated.div>
    )
}

function RegistrationSuccess(props) {
    return(
        <div 
            className="flex items-center justify-evenly flex-col w-full h-full" 
            aria-live="assertive"
        >
            <p className="w-4/6">
                Your registration was successful! Please check your provided
                email for your verification link!
            </p>
            <p className="text-red w-4/6">
                Please check your spam/junk folders! Our emails
                often get lost in there :/
            </p>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
});

//connect to redux
export default connect(
    mapStateToProps,
    { registerUser }
)(Register);