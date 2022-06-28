import React, {  } from "react";
import { connect } from "react-redux";

import Course from "./CourseComponents/Course";
import Sidebar from "./Sidebar";

function Dashboard(props) {
    
    if (props.mobile) return <Course />;
    return(
        <>
            <Course showParticles={false} />
            <Sidebar />
        </>
    );
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    mobile: state.display.mobile,
});

export default connect(
    mapStateToProps,
    {  }
)(Dashboard);