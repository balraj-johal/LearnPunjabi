import React from "react";
import { connect } from "react-redux";

function AccountSummary(props) {
    return(
        <>
            <h2>Hi {props.user.firstName}!</h2>
            <p>You have completed {props.user.progress.length} lessons.</p>
        </>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    {}
)(AccountSummary);