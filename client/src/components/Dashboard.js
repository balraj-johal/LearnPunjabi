import React, { useEffect, useState } from "react";

import Course from "./CourseComponents/Course";
import Leaderboard from "./SidebarComponents/Leaderboard";

function Dashboard(props) {
    // determine which responsive layout to use
    let [mobile, setMobile] = useState(true);
    useEffect(() => {
        let onResize = () => {
            window.innerWidth < 768 ? setMobile(true) : setMobile(false);
        }
        onResize();
        // TODO: throttle event?
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [])

    return(
        mobile ? <MobileDashboard /> : <DesktopDashboard />
    )
}

function MobileDashboard(props) {
    return(
        <>
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

function Sidebar(props) {
    return(
        <div className="sidebar">
            <Leaderboard />
        </div>
    )
}

export default Dashboard;