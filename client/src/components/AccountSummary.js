import React from "react";
import { connect } from "react-redux";

function AccountSummary(props) {
    return(
        <>
            <h2 className="text-md my-2">Hi {props.user.firstName}!</h2>
            <p className="my-2">You have {props.user.totalXP} total XP!</p>
            <p className="my-2">You have completed {props.user.progress.length} lessons.</p>
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