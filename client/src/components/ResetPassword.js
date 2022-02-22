import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import qs from 'qs';

// import redux actions
import { resetPassword } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInputField from "./FormComponents/FormInputField";
import FormSubmitButton from "./FormComponents/FormSubmitButton";

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            code: "",
            newPW: "",
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
        const data = {
            email: this.state.email,
            newPW: this.state.newPW
        };
        axios({
            method: 'post', url: `/api/users/reset-password/${this.state.code}`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            withCredentials: true
        })
            .then(res => {
                console.log("reset successful");
                console.log(res.data);
            })
            .catch(err => {
                this.state.errors = err.response.data;
                // dispatch({
                //     type: SET_AUTH_ERRORS,
                //     payload: err.response.data
                // })
            })
        e.preventDefault();
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="accounts-wrap" id="reset-password">
                <h2>Reset Password</h2>
                <form 
                    className="reset-password-form" 
                    noValidate 
                    onSubmit={this.onSubmit}
                >
                    <FormInputField 
                        dataElem="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                    />
                    <FormError 
                        dataElem="email" 
                        errors={errors} 
                    />
                    <FormInputField 
                        dataElem="code"
                        onChange={this.onChange}
                        value={this.state.code}
                        error={errors.code}
                    />
                    <FormInputField 
                        dataElem="newPW"
                        onChange={this.onChange}
                        value={this.state.newPW}
                        error={errors.newPW}
                    />
                    <FormSubmitButton dataElem="reset password" />
                </form>
            </div>
        )
    }
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
        resetPassword
    }
)(ResetPassword);