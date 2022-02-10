import React, { useState } from "react";

import { connect } from "react-redux";

// router imports
import { BrowserRouter as 
    Router,
    Route, 
    Outlet,
} from "react-router-dom";

function Lessons(props) {
    return(
        <>
            <Outlet />
        </>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
    }
)(Lessons);