import React, { useState } from "react";
import { useSpring, animated } from 'react-spring';

import axiosClient from "../../axiosDefaults";
import qs from 'qs';

// form components
import FormInput from "../FormComponents/FormInput";
import FormSubmitButton from "../FormComponents/FormSubmitButton";
import PopInModal from "../Editing/PopInModal";

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
    
    let onSubmit = async e => {
        e.preventDefault();
        try {
            await axiosClient.post("/api/v1/users/forgot-password", 
                qs.stringify({ email: email }));
            setSuccessful(true);
            setShowSuccessModal(true);
        } catch (error) {
            setErrors(error.response.data);
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
                text="Please check your emails to reset your password!" 
            /> 
            <animated.div 
                id="forgot-password" 
                className="mt-4" 
                style={{opacity: spring.opacity}}
            >
                <p className="my-4">
                    If you're forgotten your password, please enter your email below 
                    to recieve a reset link!
                </p>
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

export default ForgotPassword;