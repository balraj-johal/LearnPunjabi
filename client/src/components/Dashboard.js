import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Course from "./CourseComponents/Course";
import Sidebar from "./Sidebar";
import Leaderboard from "./SidebarComponents/Leaderboard";

import { setMobile } from "../actions/displayActions";

function Dashboard(props) {
    return( props.mobile ? <MobileDashboard /> : <DesktopDashboard /> )
}

function MobileDashboard(props) {
    return (
        <>
            <Leaderboard />
            <Course />
        </>
    )
}
function DesktopDashboard(props) {
    return(
        <>
            <Course />
            <Sidebar />
        </>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    mobile: state.display.mobile,
});

export default connect(
    mapStateToProps,
    { setMobile }
)(Dashboard);