import React, { useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "./Logo";

import AccountIcon from "../res/icons/user.png";
import Leaderboard from "./SidebarComponents/Leaderboard";

function Topbar(props) {
    let topbarWrapRef = useRef();
    let child;

    if (props.mobile) child = <Leaderboard />

    return(
        <div id="topbar-wrap" ref={topbarWrapRef}>
            <div id="topbar">
                <Link to="/dashboard">
                    <Logo />
                </Link>
                <div className="flex flex-row items-center mr-6">
                    <EditButton role={props.user.role} />
                    <AccountButton 
                        username={props.user.username} 
                        isAuthenticated={props.auth.isAuthenticated} 
                        mobile={props.mobile} 
                    />
                </div>
            </div>
            { child }
        </div>
    )
}

function EditButton(props) {
    return(
        <Link to="/edit/overview">
            { props.role === "Admin" ? (
                <div className="account-button mr-2">
                    <img src={AccountIcon} alt="account-open-button-icon" />
                </div>
            ) : null }
        </Link>
    )
}
function AccountButton(props) {
    return(
        <Link to="/account">
            { props.isAuthenticated && !props.mobile ? (
                <div className="mr-5 mt-1">Hello {props.username}!</div>
            ) : null }
            <div className="account-button">
                <img src={AccountIcon} alt="account-open-button-icon" />
            </div>
        </Link>
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