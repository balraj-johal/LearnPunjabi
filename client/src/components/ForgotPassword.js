import React, { useState } from "react";
import { connect } from "react-redux";

import { forgotPassword } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInputField from "./FormComponents/FormInputField";
import FormSubmitButton from "./FormComponents/FormSubmitButton";

function ForgotPassword(props) {
    let [email, setEmail] = useState("")
    
    // on form submit call redux action
    let onSubmit = e => {
        e.preventDefault();
        props.forgotPassword({ email: email });
    }

    return (
        <div id="forgot-password">
            <h2>Forgot Password</h2>
            <form 
                className="forgot-password-form" 
                noValidate 
                onSubmit={ onSubmit }
            >
                <FormInputField 
                    dataElem="email"
                    onChange={e => setEmail(e.target.value) }
                    value={ email }
                    error={ props.errors.email }
                />
                {/* <FormError 
                    dataElem="email" 
                    errors={ this.props.errors } 
                /> */}
                <FormSubmitButton dataElem="forgot-password" />
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
    { forgotPassword }
)(ForgotPassword);