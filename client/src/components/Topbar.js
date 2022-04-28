import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "./Logo";

import AccountIcon from "../res/icons/user.png";

function Topbar(props) {

    return(
        <div id="topbar">
            <Link to="/dashboard">
                <Logo />
            </Link>
            { props.auth.isAuthenticated ? (
                <div>Hello {props.auth.user.username}!</div>
            ) : null }
            <Link to="/account">
                <div className="account-button">
                    <img src={AccountIcon} alt="account-open-button-icon" />
                </div>
            </Link>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { }
)(Topbar);