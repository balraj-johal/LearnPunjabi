import React, { useState } from "react";
import { connect } from "react-redux";

import axiosClient from "../axiosDefaults";
import qs from 'qs';
import { forgotPassword } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInput from "./FormComponents/FormInput";
import FormSubmitButton from "./FormComponents/FormSubmitButton";
import PopInModal from "./Editing/PopInModal";

function ForgotPassword(props) {
    let [email, setEmail] = useState("")
    let [successful, setSuccessful] = useState(false);
    let [showSuccessModal, setShowSuccessModal] = useState(false);
    let [errors, setErrors] = useState(null);
    
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
            <div id="forgot-password" className="mt-4">
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
            </div>
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