import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    useParams 
} from "react-router-dom";

import axiosClient from "../axiosDefaults";

// import redux actions
import { resetPassword } from "../actions/authActions";

function VerifyEmail(props) {
    let params = useParams();

    useEffect(() => {
        if (params.code && props.csrf.ready) {
            axiosClient.get(`/api/v1/users/verify-email/${params.code}`)
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [props.csrf.ready])

    return (
        <div className="accounts-wrap" id="verify-email">
            {params.code}
        </div>
    )
}
//pull relevant props from redux state
const mapStateToProps = state => ({
    errors: state.auth.errors,
    csrf: state.csrf
});

export default connect(
    mapStateToProps,
    { resetPassword }
)(VerifyEmail);