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
            
            <Link to="/edit/overview">
                { props.auth.user.role === "Admin" ? (
                    <div className="mr-5 mt-1">Edit Lessons</div>
                ) : null }
            </Link>
            <Link to="/account">
                <div className="flex flex-row items-center mr-6">
                    { props.auth.isAuthenticated ? (
                        <div className="mr-5 mt-1">Hello {props.auth.user.username}!</div>
                    ) : null }
                    <div className="account-button">
                        <img src={AccountIcon} alt="account-open-button-icon" />
                    </div>
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