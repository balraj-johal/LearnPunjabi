import React, { useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated } from 'react-spring';

import axiosClient from "../axiosDefaults";
import qs from 'qs';
import { forgotPassword } from "../actions/authActions";

// form components
import FormInput from "./FormComponents/FormInput";
import FormSubmitButton from "./FormComponents/FormSubmitButton";
import PopInModal from "./Editing/PopInModal";

function ForgotPassword(props) {
    let [email, setEmail] = useState("")
    let [successful, setSuccessful] = useState(false);
    let [showSuccessModal, setShowSuccessModal] = useState(false);
    let [errors, setErrors] = useState(null);

    const spring = useSpring({ 
        to: { opacity: 1 }, 
        from: { opacity: 0 }, 
        delay: 200,
    });
    
    // on form submit call redux action
    let onSubmit = async e => {
        e.preventDefault();
        try {
            await axiosClient.post("/api/v1/users/forgot-password", 
                qs.stringify({ email: email }));
                setSuccessful(true);
                setShowSuccessModal(true);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data)
        }
    }

    return (
        <>
            <PopInModal 
                show={showSuccessModal} 
                length={4000} 
                unrender={() => { 
                    setShowSuccessModal(false); 
                }}
                text="Check your emails to reset your password!" 
            /> 
            <animated.div id="forgot-password" className="mt-4" style={{opacity: spring.opacity}}>
                <h2>Forgot Password</h2>
                <form 
                    className="forgot-password-form" 
                    noValidate 
                    onSubmit={ onSubmit }
                >
                    <FormInput 
                        for="email"
                        onChange={e => setEmail(e.target.value) }
                        value={ email }
                        errors={ errors }
                        type="text"
                    />
                    <FormSubmitButton for="forgot-password" text="Submit" />
                </form>
            </animated.div>
        </>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    errors: state.auth.errors
});

export default connect(
    mapStateToProps,
    { forgotPassword }
)(ForgotPassword);