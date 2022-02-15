import React, {  } from "react";
import { connect } from "react-redux";
import { 
    Navigate
} from "react-router-dom";

function ProtectedRoute({ component, ...props}) {
    if (props.isAuthenticated) {
        return component;
    } else {
        return(
            <Navigate replace to="/account" />
        )
    }
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {}
)(ProtectedRoute);