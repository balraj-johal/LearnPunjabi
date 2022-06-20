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
            className="register relative h-full" 
            style={spring} 
        >
            { successful ? (
                <RegistrationSuccess />
            ) : (
                <form className="register-form" noValidate onSubmit={onSubmit} >
                    <FormInput 
                        for="username"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        errors={errors}
                        type="username"
                    />
                    <FormInput 
                        for="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        errors={errors}
                        type="text"
                    />
                    <FormInput 
                        for="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        errors={errors}
                        type="password"
                    />
                    <FormInput 
                        for="confirmPassword"
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
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
        <div className="flex items-center justify-evenly flex-col w-full h-full">
            <p className="w-4/6">
                Your registration was successful! Please check your provided
                email for your verification link!
            </p>
            <p className="text-red">
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