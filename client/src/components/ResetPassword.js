import React, { useState } from "react";
import { connect } from "react-redux";
import {
    useParams 
} from "react-router-dom";

// import redux actions
import { resetPassword } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInput from "./FormComponents/FormInput";
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
                <FormInput 
                    for="email"
                    onChange={ e => setEmail(e.target.value) }
                    value={ email }
                    error={ props.errors.email }
                    type="text"
                />
                <FormError 
                    for="email" 
                    errors={ props.errors } 
                />
                <FormInput 
                    for="newPW"
                    onChange={ e => setNewPW(e.target.value) }
                    value={ newPW }
                    error={ props.errors.newPW }
                    type="password"
                />
                <FormSubmitButton for="reset-password" text="Submit" />
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