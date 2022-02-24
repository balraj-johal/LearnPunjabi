import React, { useState } from "react";
import { connect } from "react-redux";

import { registerUser } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInputField from "./FormComponents/FormInputField";
import FormSubmitButton from "./FormComponents/FormSubmitButton";

function Register(props) {
    let [username, setUsername] = useState("")
    let [firstName, setFirstName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    let onSubmit = e => {
        e.preventDefault();
        let data = {
            username: username,
            password: password,
            email: email,
            firstName: firstName
        }
        props.registerUser(data);
    }

    return(
        <div className="register">
            <h2>Register</h2>
            <form className="register-form" noValidate onSubmit={ onSubmit }>
                <FormInputField 
                    dataElem="username"
                    onChange={e => setUsername(e.target.value) }
                    value={ username }
                    error={ props.errors.username }
                />
                <FormError 
                    dataElem="username" 
                    errors={ props.errors } 
                />
                <FormInputField 
                    dataElem="firstName"
                    onChange={ e => setFirstName(e.target.value) }
                    value={ firstName }
                    error={ props.errors.firstName }
                />
                <FormError 
                    dataElem="firstName" 
                    errors={ props.errors } 
                />
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
                    dataElem="password"
                    onChange={ e => setPassword(e.target.value) }
                    value={ password }
                    error={ props.errors.password }
                />
                <FormError 
                    dataElem="password" 
                    errors={ props.errors } 
                />
                <FormError 
                    dataElem="verification" 
                    errors={ props.errors } 
                />
                <FormSubmitButton dataElem="register" />
            </form>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.auth.errors
});

//connect to redux
export default connect(
    mapStateToProps,
    { registerUser }
)(Register);