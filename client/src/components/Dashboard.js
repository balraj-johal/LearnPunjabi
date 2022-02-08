import React from "react";

import Topbar from "./Topbar";
import Course from "./CourseComponents/Course"

function Dashboard(props) {

    let courseIndex = 0;
    let courses = ["Punjabi 101"];

    return(
        <div id="main">
            <Topbar />
            <div className="container">
                <Course />
            </div>
        </div>
    )
}

export default Dashboard;