import React, {  } from "react";
import { connect } from "react-redux";

import Topbar from "./Topbar";

function InternalPage({ children, ...props }) {
    return(
        <>
            <Topbar />
            <div className="container flex" style={{height: `calc(100vh - ${props.topbarHeight}px)`}} >
                { children }
            </div>
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