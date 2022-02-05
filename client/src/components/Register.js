import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import axios from "axios";
import qs from 'qs'

import { registerUser } from "../actions/authActions";

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
    }
    componentDidMount() {
    }

    //TODO: this is dodgy need to fix, see
    //https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.auth.isAuthenticated) {
    //         this.props.history.push("/game");
    //         // this.state.register_fx.play(0.25);
    //         // setTimeout(() => {
    //         //     this.props.history.push("/game");
    //         // }, 5000);
    //     } else {
    //     }
    //     if (nextProps.errors) {
    //         this.setState({ errors: nextProps.errors });
    //     }
    // }

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
            url: "http://localhost:3001/api/users/register",
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
                <div className="register-window bevel">
                    <div className="register-area">
                        <form className="register-form" noValidate onSubmit={this.onSubmit}>
                            <div className="input-field">
                                <label htmlFor="username">Username:</label><br/>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    error={errors.username}
                                    id="username"
                                    type="text"
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="firstName">First Name:</label><br/>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                    error={errors.firstName}
                                    id="firstName"
                                    type="text"
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="email">Email:</label><br/>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="text"
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password:</label><br/>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="text"
                                />
                            </div>
                            <div className="register-error">
                                <span className="red-text">
                                    {errors.username}
                                    {errors.msg}
                                    {errors.date}
                                </span>
                            </div>
                            <div className="button-wrap-register" >
                                <button
                                    type="submit"
                                >
                                Register
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