import React, { useState } from "react";
import { connect } from "react-redux";
import {
    useParams 
} from "react-router-dom";

// import redux actions
import { resetPassword } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInputField from "./FormComponents/FormInputField";
import FormSubmitButton from "./FormComponents/FormSubmitButton";

function ResetPassword(props) {
    let params = useParams();

    let [email, setEmail] = useState("");
    let [newPW, setNewPW] = useState("");

    let onSubmit = e => {
        e.preventDefault();
        props.resetPassword({ 
            email: email,
            code: params.code,
            newPW: newPW
        });
    }

    return (
        <div className="accounts-wrap" id="reset-password">
            <h2>Reset Password</h2>
            <form 
                className="reset-password-form" 
                noValidate 
                onSubmit={ onSubmit }
            >
                <FormInputField 
                    dataElem="email"
                    onChange={ e => setEmail(e.target.value) }
                    value={ email }
                    error={ props.errors.email }
                />
                <FormError 
                    dataElem="email" 
                    errors={ props.errors } 
                />
                <FormInputField 
                    dataElem="newPW"
                    onChange={ e => setNewPW(e.target.value) }
                    value={ newPW }
                    error={ props.errors.newPW }
                />
                <FormSubmitButton dataElem="reset-password" />
            </form>
        </div>
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