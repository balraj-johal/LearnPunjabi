import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import axiosClient from "../axiosDefaults";
import GenericButton from "./GenericButton";

import Loader from "./Loader";

function VerifyEmail(props) {
    let navigate = useNavigate();
    let params = useParams();
    let [queried, setQueried] = useState(false);
    let [successful, setSuccessful] = useState(false);

    useEffect(() => {
        let redirectTimeout;
        if (params.code) {
            axiosClient.put(`/api/v1/users/verify-email/${params.code}`)
                .then(() => {
                    setSuccessful(true);
                    setQueried(true);
                })
                .catch(err => { 
                    console.log(err);
                    setQueried(true);
                })
        }

        return () => { clearTimeout(redirectTimeout) };
    }, [params.code]);

    return (
        <div
            id="verify-email"
            className="accounts-wrap bg-white shadow-xl rounded"
        >
            {queried ? (
                <div className="flex flex-col justify-evenly items-center text-center h-full p-4">
                    {true ? (
                        <>
                            <p>Email verification successful! Please log in with your details!</p>
                            <Link to="/account">
                                <GenericButton text="Go to Login" handleClick={() => {}} />
                            </Link>
                        </>
                        
                    ) : (
                        "Email verification unsuccessful... Please check your email again."
                    )}
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