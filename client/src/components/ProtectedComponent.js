import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// auth actions
import { useRefreshToken } from "../actions/authActions";
import Loader from "./Loader";

/**
 * Compnent wrapper to redirect to login page if user is not authenticated
 * @name ProtectedComponent
 * @param  {Component} component - component to render if authenticated
 * @param  {Object} props
 */
function ProtectedComponent({ component, ...props}) {
    let [ready, setReady] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (props.role) {
            if (!props.isLoading) {
                if (props.auth.user.role === props.role) {
                    setReady(true);
                } else {
                    console.log(props.auth);
                    props.useRefreshToken();
                    navigate("/restricted");
                }
            }
        } else {
            if (!props.isLoading) {
                if (props.isAuthenticated) {
                    setReady(true);
                } else {
                    props.useRefreshToken();
                    navigate("/account");
                }
            }
        }
    }, [props.auth]);
    
    if (ready) {
        return component;
    } else {
        return(
            <Loader />
        );
    }
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.loading
});

export default connect(
    mapStateToProps,
    { useRefreshToken }
)(ProtectedComponent);