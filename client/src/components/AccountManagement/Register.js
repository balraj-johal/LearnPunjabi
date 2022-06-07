import React, { useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated } from 'react-spring';

import { registerUser } from "../../actions/authActions";

import axiosClient from "../../axiosDefaults";
import qs from 'qs';

// form components
import FormError from "../FormComponents/FormError";
import FormInput from "../FormComponents/FormInput";
import FormSubmitButton from "../FormComponents/FormSubmitButton";
import PopInModal from "../Editing/PopInModal";

function Register(props) {
    // initalise form state
    let [submitting, setSubmitting] = useState(false);
    let [showSuccessModal, setShowSuccessModal] = useState(true);
    let [successful, setSuccessful] = useState(false);
    let [errors, setErrors] = useState({});

    let [username, setUsername] = useState("");
    let [firstName, setFirstName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    const spring = useSpring({ 
        to: { opacity: 1 }, 
        from: { opacity: 0 }, 
        delay: 200,
    });

    let onSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        let formData = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            email: email,
            firstName: firstName
        }
        try {
            await axiosClient.post("/api/v1/users/", qs.stringify(formData));
            setSuccessful(true);
            setSubmitting(false);
        } catch (error) {
            setErrors(error.response.data);
            setSubmitting(false);
        }
    }

    return(
        <>
            { successful ? 
                <PopInModal 
                    show={showSuccessModal} 
                    length={4000} 
                    unrender={() => { 
                        setShowSuccessModal(false); 
                        props.setManagerState("Login"); 
                    }}
                    text="Registration successful! Please check your emails for verification!" 
                /> : 
            null }
            <animated.div className="register" style={{opacity: spring.opacity}}>
                <form className="register-form" noValidate onSubmit={ onSubmit }>
                    <FormInput 
                        for="username"
                        onChange={ e => setUsername(e.target.value) }
                        value={ username }
                        errors={ errors }
                        type="username"
                    />
                    <FormInput 
                        for="firstName"
                        onChange={ e => setFirstName(e.target.value) }
                        value={ firstName }
                        errors={ errors }
                        type="text"
                    />
                    <FormInput 
                        for="email"
                        onChange={ e => setEmail(e.target.value) }
                        value={ email }
                        errors={ errors }
                        type="text"
                    />
                    <FormInput 
                        for="password"
                        onChange={ e => setPassword(e.target.value) }
                        value={ password }
                        errors={ errors }
                        type="password"
                    />
                    <FormInput 
                        for="confirmPassword"
                        onChange={ e => setConfirmPassword(e.target.value) }
                        value={ confirmPassword }
                        errors={ errors }
                        type="password"
                    />
                    <FormError for="verification" errors={ errors } />
                    <FormSubmitButton for="register" disabled={ submitting } />
                </form>
            </animated.div>
        </>
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