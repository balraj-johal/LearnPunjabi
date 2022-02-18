import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import axios from "axios";
import qs from 'qs'

import { registerUser } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInputField from "./FormComponents/FormInputField";
import FormSubmitButton from "./FormComponents/FormSubmitButton";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            firstName: "",
            errors: {},
        };
    };

    //form control methods
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    onSubmit = e => {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstName: this.state.firstName,
        };
        // this.props.registerUser(data);
        axios({
            method: 'post',
            url: "/api/users/register",
            data: qs.stringify(data),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            withCredentials: true
        })
            .then(res => {
                console.log(res);
                alert("Register successful.");
                this.props.setManagerState("Login");
            })
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <h2>Register</h2>
                <form className="register-form" noValidate onSubmit={this.onSubmit}>
                    <FormInputField 
                        dataElem="username"
                        onChange={this.onChange}
                        value={this.state.username}
                        error={errors.username}
                    />
                    <FormError 
                        dataElem="username" 
                        errors={this.props.errors} 
                    />
                    <FormInputField 
                        dataElem="firstName"
                        onChange={this.onChange}
                        value={this.state.firstName}
                        error={errors.firstName}
                    />
                    <FormError 
                        dataElem="firstName" 
                        errors={this.props.errors} 
                    />
                    <FormInputField 
                        dataElem="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                    />
                    <FormError 
                        dataElem="email" 
                        errors={this.props.errors} 
                    />
                    <FormInputField 
                        dataElem="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                    />
                    <FormError 
                        dataElem="password" 
                        errors={this.props.errors} 
                    />
                    <FormError 
                        dataElem="verification" 
                        errors={this.props.errors} 
                    />
                    <FormSubmitButton dataElem="register" />
                </form>
            </div>
        )
    }
}

//define prop types
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
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