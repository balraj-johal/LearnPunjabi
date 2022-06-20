import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// auth actions
import { useRefreshToken } from "../actions/authActions";

/** Compnent wrapper to redirect to login page if user is not authenticated
 * @name ProtectByRole
 * @param {Component} component - component to render if authenticated
 * @param {Object} props
 */
function ProtectByRole({ component, ...props}) {
    let [ready, setReady] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (props.role) {
            if (!props.isLoading) {
                if (props.auth.user.role === props.role) {
                    setReady(true);
                } else {
                    props.useRefreshToken();
                    navigate("/restricted");
                }
            }
        }
    }, [props.auth]);
    
    if (ready) return component;
    return null;
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
)(ProtectByRole);