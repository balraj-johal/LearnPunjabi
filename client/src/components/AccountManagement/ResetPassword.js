import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import axiosClient from "../../axiosDefaults";
import qs from 'qs';

// import redux actions
import { resetPassword } from "../../actions/authActions";

// form components
import FormError from "../FormComponents/FormError";
import FormInput from "../FormComponents/FormInput";
import FormSubmitButton from "../FormComponents/FormSubmitButton";
import PopInModal from "../Editing/PopInModal";

function ResetPassword(props) {
    let params = useParams();

    let [email, setEmail] = useState("");
    let [newPW, setNewPW] = useState("");
    let [successful, setSuccessful] = useState(false);
    let [showSuccessModal, setShowSuccessModal] = useState(false);
    let [errors, setErrors] = useState(null);

    let onSubmit = async e => {
        e.preventDefault();
        // props.resetPassword({ 
        //     email: email,
        //     code: params.code,
        //     newPW: newPW
        // });
        try {
            const userData = { email: email, code: params.code, newPW: newPW};
            const URL = `/api/v1/users/reset-password/${userData.code}`;
            await axiosClient.post(URL, qs.stringify(userData));
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
                text="Reset successful!" 
            /> 
            <div className="accounts-wrap p-4 bg-white shadow-xl" id="reset-password">
                <h1 className="text-lg">Reset Password</h1>
                <form 
                    className="reset-password-form" 
                    noValidate 
                    onSubmit={onSubmit}
                >
                    <FormInput 
                        for="email"
                        onChange={e => setEmail(e.target.value)}
                        required={true}
                        value={email}
                        errors={errors}
                        type="text"
                    />
                    <FormInput 
                        for="newPassword"
                        onChange={e => setNewPW(e.target.value)}
                        value={newPW}
                        required={true}
                        errors={errors}
                        type="password"
                    />
                    <FormError for="resetError" errors={errors} /> 
                    <FormSubmitButton for="reset-password" text="Submit" />
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
    { resetPassword }
)(ResetPassword);