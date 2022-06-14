import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import Topbar from "./Topbar";
import CookieConsent from "react-cookie-consent";

function InternalPage(props) {
    let navigate = useNavigate();
    // NOTE: this gives whole path, not path pattern
    let path = useLocation().pathname; 
    
    // redirect to dashboard if user is at site root
    useEffect(() => {
        if (path === "/") navigate("/dashboard");
    }, [path])

    return(
        <>
            <Topbar />
            <div 
                className="container flex overflow-hidden" 
                style={{
                    height: `calc(100vh - ${props.topbarHeight}px)`
                }} 
            >
                {!props.loading && <Outlet />}
            </div>
            <CookieConsent
                acceptOnScroll={true}
                acceptOnScrollPercentage={10}
                overlay
            >
                This website uses cookies to authenticate the user.
            </CookieConsent>
            <div className="w-full h-full bg-gradient absolute z-[-1] top-0">
                <div className="w-full h-full"/>
            </div>
        </>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    topbarHeight: state.display.topbarHeight,
    vh: state.display.singleVH,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,

});

export default connect(
    mapStateToProps,
    {}
)(InternalPage);