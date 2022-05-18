import React, {  } from "react";
import { connect } from "react-redux";

import Topbar from "./Topbar";
import CookieConsent from "react-cookie-consent";

function InternalPage({ children, ...props }) {
    return(
        <>
            <Topbar />
            <div 
                className="container flex" 
                id="internal-main" 
                style={{height: `calc(100vh - ${props.topbarHeight}px)`}} 
            >
                { children }
            </div>
            <CookieConsent
                acceptOnScroll={true}
                acceptOnScrollPercentage={10}
                overlay
            >
                This website uses cookies to authenticate the user.
            </CookieConsent>
        </>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    topbarHeight: state.display.topbarHeight,
});

export default connect(
    mapStateToProps,
    {}
)(InternalPage);