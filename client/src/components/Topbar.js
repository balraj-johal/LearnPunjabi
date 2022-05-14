import React, { useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import Logo from "./Logo";
import LogoIcon from "./LogoIcon"

import { setTopbarHeight } from "../actions/displayActions";

import AccountIcon from "../res/icons/user.png";
import EditIcon from "../res/icons/edit.png";
import Leaderboard from "./SidebarComponents/Leaderboard";

function Topbar(props) {
    let topbarRef = useRef();

    // Only render the leaderboard when on the dashboard route
    // NOTE: this gives whole path, not path pattern
    let path = useLocation().pathname;
    let child;
    if (props.mobile && path === "/dashboard" 
        && props.auth.user.isAuthenticated) child = <Leaderboard />;

    // attempt to update redux topbar height value on change of ref height
    let setRefHeight = useCallback(() => {
        if (topbarRef.current.clientHeight === 227) return props.setTopbarHeight(147); // TODO: remove hardcoded case
        props.setTopbarHeight(topbarRef.current.clientHeight);
    }, [topbarRef, child, path])
    useEffect(() => {
        setRefHeight();
    }, [topbarRef, child, path])
    
    return(
        <div id="topbar-wrap" ref={topbarRef} className="no-highlight" >
            <div id="topbar">
                <Link to="/dashboard">
                    { props.mobile ? <LogoIcon /> : <Logo /> }
                </Link>
                <div className="flex flex-row items-center mr-6">
                { props.auth.isAuthenticated && !props.mobile ? (
                    <div className="mr-5 mt-2">Hello {props.auth.user.username}!</div>
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
                <div className="account-button mr-2 hover:bg-primary2 transition-all">
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
            <div className="account-button hover:bg-primary2 transition-all">
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
    { setTopbarHeight }
)(Topbar);