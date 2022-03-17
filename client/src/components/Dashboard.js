import React, { useEffect, useState } from "react";

import Course from "./CourseComponents/Course";
import Sidebar from "./Sidebar";

function Dashboard(props) {
    // determine which responsive layout to use
    let [mobile, setMobile] = useState(true);
    
    // set up resize handlers
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

export default Dashboard;