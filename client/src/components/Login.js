import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loginUser } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInputField from "./FormComponents/FormInputField";
import FormSubmitButton from "./FormComponents/FormSubmitButton";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            submitting: false,
            username: "",
            password: "",
            email: "",
            firstName: "",
            errors: {},
        };
    }

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
        this.props.loginUser(data);
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <h2>Login</h2>
                <form className="login-form" noValidate onSubmit={this.onSubmit}>
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
                    <FormSubmitButton dataElem="login" />
                    <div onClick={() => {
                        this.props.setManagerState("ForgotPassword");
                    }}>Forgot Password?</div>
                </form>
            </div>
        )
    }
}


//define prop types
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.auth.errors
});

//connect to redux
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);