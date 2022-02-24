import React, { useState, useEffectlet  } from "react";
import { connect } from "react-redux";
import axiosClient from "../axiosDefaults";
import qs from 'qs';

// import redux actions
import { resetPassword } from "../actions/authActions";

// form components
import FormError from "./FormComponents/FormError";
import FormInputField from "./FormComponents/FormInputField";
import FormSubmitButton from "./FormComponents/FormSubmitButton";

function ResetPassword(props) {
    let [email, setEmail] = useState("")
    let [code, setCode] = useState("")
    let [newPW, setNewPW] = useState("")

    let onSubmit = e => {
        e.preventDefault();
        const data = { email: email };
        this.props.forgotPassword(data);
    }

    return (
        <div className="accounts-wrap" id="reset-password">
            <h2>Reset Password</h2>
            <form 
                className="reset-password-form" 
                noValidate 
                onSubmit={ onSubmit }
            >
                <FormInputField 
                    dataElem="email"
                    onChange={e => setEmail(e.target.value) }
                    value={email}
                    error={props.errors.email}
                />
                <FormError 
                    dataElem="email" 
                    errors={props.errors} 
                />
                <FormInputField 
                    dataElem="code"
                    onChange={e => setCode(e.target.value) }
                    value={code}
                    error={props.errors.code}
                />
                <FormInputField 
                    dataElem="newPW"
                    onChange={e => setNewPW(e.target.value) }
                    value={newPW}
                    error={props.errors.newPW}
                />
                <FormSubmitButton dataElem="reset password" />
            </form>
        </div>
    )
}

// class ResetPassword extends Component {
//     constructor() {
//         super();
//         this.state = {
//             email: "",
//             code: "",
//             newPW: "",
//             errors: {},
//         };
//     }

//     //form control methods
//     onChange = e => {
//         this.setState({
//             [e.target.id]: e.target.value
//         });
//     }
//     onSubmit = e => {
//         const data = {
//             email: email,
//             newPW: this.state.newPW
//         };
//         axiosClient.post(`/api/users/reset-password/${this.state.code}`, qs.stringify(data))
//             .then(res => {
//                 console.log("reset successful");
//                 console.log(res.data);
//             })
//             .catch(err => {
//                 this.state.errors = err.response.data;
//                 // dispatch({
//                 //     type: SET_AUTH_ERRORS,
//                 //     payload: err.response.data
//                 // })
//             })
//         e.preventDefault();
//     }


//     render() {
//         const { errors } = this.state;
//         return (
//             <div className="accounts-wrap" id="reset-password">
//                 <h2>Reset Password</h2>
//                 <form 
//                     className="reset-password-form" 
//                     noValidate 
//                     onSubmit={this.onSubmit}
//                 >
//                     <FormInputField 
//                         dataElem="email"
//                         onChange={this.onChange}
//                         value={this.state.email}
//                         error={errors.email}
//                     />
//                     <FormError 
//                         dataElem="email" 
//                         errors={errors} 
//                     />
//                     <FormInputField 
//                         dataElem="code"
//                         onChange={this.onChange}
//                         value={this.state.code}
//                         error={errors.code}
//                     />
//                     <FormInputField 
//                         dataElem="newPW"
//                         onChange={this.onChange}
//                         value={this.state.newPW}
//                         error={errors.newPW}
//                     />
//                     <FormSubmitButton dataElem="reset password" />
//                 </form>
//             </div>
//         )
//     }
// }

//pull relevant props from redux state
const mapStateToProps = state => ({
    errors: state.auth.errors
});

export default connect(
    mapStateToProps,
    {
        resetPassword
    }
)(ResetPassword);