import React, { useState } from "react";
import { connect } from "react-redux";

import { registerUser } from "../actions/authActions";

import axiosClient from "../axiosDefaults";
import qs from 'qs';

// form components
import FormError from "./FormComponents/FormError";
import FormInputField from "./FormComponents/FormInputField";
import FormSubmitButton from "./FormComponents/FormSubmitButton";

function Register(props) {
    // initalise form state
    let [username, setUsername] = useState("");
    let [firstName, setFirstName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [successful, setSuccessful] = useState(false);
    let [errors, setErrors] = useState({});

    let onSubmit = e => {
        e.preventDefault();
        let formData = {
            username: username,
            password: password,
            email: email,
            firstName: firstName
        }
        axiosClient.post("/api/v1/users/", qs.stringify(formData))
            .then(res => { setSuccessful(true); })
            .catch(err => { setErrors(err.response.data); })
    }

    return(
        successful ? <Success /> : (
            <div className="register">
                <h2>Register</h2>
                <form className="register-form" noValidate onSubmit={ onSubmit }>
                    <FormInputField 
                        dataElem="username"
                        onChange={e => setUsername(e.target.value) }
                        value={ username }
                        error={ errors.username }
                        type="username"
                    />
                    <FormError 
                        dataElem="username" 
                        errors={ errors } 
                    />
                    <FormInputField 
                        dataElem="firstName"
                        onChange={ e => setFirstName(e.target.value) }
                        value={ firstName }
                        error={ errors.firstName }
                    />
                    <FormError 
                        dataElem="firstName" 
                        errors={ errors } 
                    />
                    <FormInputField 
                        dataElem="email"
                        onChange={ e => setEmail(e.target.value) }
                        value={ email }
                        error={ errors.email }
                    />
                    <FormError 
                        dataElem="email" 
                        errors={ errors } 
                    />
                    <FormInputField 
                        dataElem="password"
                        onChange={ e => setPassword(e.target.value) }
                        value={ password }
                        error={ errors.password }
                        type="password"
                    />
                    <FormError 
                        dataElem="password" 
                        errors={ errors } 
                    />
                    <FormError 
                        dataElem="verification" 
                        errors={ errors } 
                    />
                    <FormSubmitButton dataElem="register" />
                </form>
            </div>
        )
    )
}

function Success(props) {
    return(
        <>
            Registration successful!

            Please check the email you signed up with to verify your account!
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