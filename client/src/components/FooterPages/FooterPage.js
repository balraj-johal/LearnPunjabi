import React from "react";
import { Link, Outlet } from "react-router-dom";
import RiversTop from "../Welcome/RiversSVGs/RiversTop";
import WelcomeLogo from "../Welcome/WelcomeLogo";

function FooterPage(props) {
    return(
        <div className="footer-page h-screen grad-top overflow-hidden">
            <WelcomeLogo />
            <RiversTop />
            <Link to="/welcome">
                &lt; Back
            </Link>
            <div className="w-7/12 bg-black bg-opacity-25 h-5/6 text-white p-6 
                mx-10 my-8 overflow-y-auto"
            >
                <Outlet />
            </div>
        </div>
    )
}

export default FooterPage;