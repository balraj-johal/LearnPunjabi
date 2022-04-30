import React, { useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "./Logo";

import AccountIcon from "../res/icons/user.png";
import EditIcon from "../res/icons/edit.png";
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
                { props.auth.isAuthenticated && !props.mobile ? (
                    <div className="mr-5 mt-1">Hello {props.auth.user.username}!</div>
                ) : null }
                    <EditButton role={props.auth.user.role} />
                    <AccountButton 
                        username={props.auth.user.username} 
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
                    <img 
                        style={{margin: "-2px -2px 0 0"}} // minor adjustment to center icon
                        src={EditIcon} 
                        alt="account-open-button-icon" 
                    />
                </div>
            ) : null }
        </Link>
    )
}
function AccountButton(props) {
    return(
        <Link to="/account">
            <div className="account-button">
                <img src={AccountIcon} alt="account-open-button-icon" />
            </div>
        </Link>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
    mobile: state.display.mobile
});

export default connect(
    mapStateToProps,
    { }
)(Topbar);