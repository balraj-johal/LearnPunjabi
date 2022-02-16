import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loginUser } from "../actions/authActions";

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
        // this.state.submitting = true;
        const data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstName: this.state.firstName,
        };
        console.log("Login form submitted for user: ", data.username);
        this.props.loginUser(data);
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <h2>Login</h2>
                <div className="login-window bevel">
                    <div className="login-area">
                        <form className="login-form" noValidate onSubmit={this.onSubmit}>
                            <div className="input-field">
                                <label htmlFor="username">Username:</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    error={errors.username}
                                    id="username"
                                    type="text"
                                />
                            </div>
                            <div className="auth-error" id="login-username-error">
                                { this.props.errors.username }
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password:</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={this.props.errors.password}
                                    id="password"
                                    type="text"
                                />
                            </div>
                            <div className="auth-error" id="login-pw-error">
                                { this.props.errors.password }
                            </div>
                            <div className="auth-error" id="login-verification-error">
                                { this.props.errors.verification }
                            </div>
                            <div className="button-wrap-login" >
                                <button
                                    type="submit"
                                >
                                Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

//define prop types
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
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
    { loginUser }
)(Login);