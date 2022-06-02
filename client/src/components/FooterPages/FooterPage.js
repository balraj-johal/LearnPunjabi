import React from "react";
import { Link, Outlet } from "react-router-dom";
import RiversTop from "../Welcome/RiversSVGs/RiversTop";
import WelcomeLogo from "../Welcome/WelcomeLogo";

function FooterPage(props) {
    return(
        <div className="footer-page h-screen grad-top overflow-hidden">
            <WelcomeLogo />
            <RiversTop />
            <div className="w-7/12 h-4/5 lg:h-4/6 p-6 mx-10 my-8 
                bg-white text-black rounded shadow-xl
                overflow-y-auto"
            >
                <Link 
                    to="/welcome" 
                    className="text-primary cursor-pointer mb-4 block w-14"
                >
                    &lt; Back
                </Link>
                <Outlet />
            </div>
        </div>
    )
}

export default FooterPage;