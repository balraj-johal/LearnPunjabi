import React, { useState } from "react";
import { connect } from "react-redux";

import { registerUser } from "../actions/authActions";

import axiosClient from "../axiosDefaults";
import qs from 'qs';

// form components
import FormError from "./FormComponents/FormError";
import FormInput from "./FormComponents/FormInput";
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
                <form className="register-form" noValidate onSubmit={ onSubmit }>
                    <FormInput 
                        for="username"
                        onChange={e => setUsername(e.target.value) }
                        value={ username }
                        error={ errors.username }
                        type="username"
                    />
                    <FormError 
                        for="username" 
                        errors={ errors } 
                    />
                    <FormInput 
                        for="firstName"
                        onChange={ e => setFirstName(e.target.value) }
                        value={ firstName }
                        error={ errors.firstName }
                        type="text"
                    />
                    <FormError 
                        for="firstName" 
                        errors={ errors } 
                    />
                    <FormInput 
                        for="email"
                        onChange={ e => setEmail(e.target.value) }
                        value={ email }
                        error={ errors.email }
                        type="text"
                    />
                    <FormError 
                        for="email" 
                        errors={ errors } 
                    />
                    <FormInput 
                        for="password"
                        onChange={ e => setPassword(e.target.value) }
                        value={ password }
                        error={ errors.password }
                        type="password"
                    />
                    <FormError 
                        for="password" 
                        errors={ errors } 
                    />
                    <FormError 
                        for="verification" 
                        errors={ errors } 
                    />
                    <FormSubmitButton for="register" />
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