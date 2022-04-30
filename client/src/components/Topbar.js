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
            
            <div className="flex flex-row items-center mr-6">
                <Link to="/edit/overview">
                    { props.user.role === "Admin" ? (
                        <div className="account-button mr-2">
                            <img src={AccountIcon} alt="account-open-button-icon" />
                        </div>
                    ) : null }
                </Link>
                <Link to="/account">
                    { props.auth.isAuthenticated && !props.mobile ? (
                        <div className="mr-5 mt-1">Hello {props.user.username}!</div>
                    ) : null }
                    <div className="account-button">
                        <img src={AccountIcon} alt="account-open-button-icon" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user,
    mobile: state.display.mobile
});

export default connect(
    mapStateToProps,
    { }
)(Topbar);