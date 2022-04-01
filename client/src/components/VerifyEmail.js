import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import axiosClient from "../axiosDefaults";

function VerifyEmail(props) {
    let [successful, setSuccessful] = useState(false);
    let params = useParams();

    useEffect(() => {
        if (params.code && props.csrf.ready) {
            axiosClient.get(`/api/v1/users/verify-email/${params.code}`)
                .then(result => {
                    setSuccessful(true);
                    console.log(result);
                })
                .catch(err => { console.log(err); })
        }
    }, [props.csrf.ready, params.code])

    return (
        <div className="accounts-wrap" id="verify-email">
            {successful ? (
                <div>
                    Email verification successful! Please log in with your details!
                </div>
            ) : (
                <div>
                    NAH
                </div>
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