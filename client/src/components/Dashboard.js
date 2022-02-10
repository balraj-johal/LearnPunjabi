import React from "react";

import Topbar from "./Topbar";
import Course from "./CourseComponents/Course";

import {
    Route,
    Routes
} from "react-router-dom";

function Dashboard(props) {

    let courseIndex = 0;
    let courses = ["Punjabi 101"];

    return(
        <div className="container">
            <Routes>
                <Route path="/" element={<Course />} />
                <Route path="/lesson" element={<Course />} />
            </Routes>
        </div>
    )
}

export default Dashboard;