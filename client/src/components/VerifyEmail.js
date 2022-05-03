import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import axiosClient from "../axiosDefaults";

import Loader from "./Loader";

function VerifyEmail(props) {
    let navigate = useNavigate();
    let [successful, setSuccessful] = useState(false);
    let params = useParams();

    useEffect(() => {
        let redirectTimeout;
        if (params.code && props.csrf.ready) {
            axiosClient.get(`/api/v1/users/verify-email/${params.code}`)
                .then(result => {
                    setSuccessful(true);
                    redirectTimeout = setTimeout(() => {
                        navigate("/account");
                    }, 1500);
                })
                .catch(err => { console.log(err); })
        }

        return () => { clearTimeout(redirectTimeout) };
    }, [props.csrf.ready, params.code]);

    return (
        <div className="accounts-wrap" id="verify-email">
            {successful ? (
                <div className="flex justify-center items-center text-center">
                    Email verification successful! Please log in with your details!
                </div>
            ) : (
                <Loader />
            )}
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
    {}
)(VerifyEmail);