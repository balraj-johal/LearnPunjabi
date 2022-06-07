import React from "react";
import { Link, Outlet } from "react-router-dom";
import RiversTop from "../Welcome/RiversSVGs/RiversTop";
import WelcomeLogo from "../Welcome/WelcomeLogo";

function FooterPage(props) {
    return(
        <div className="footer-page h-screen grad-top">
            <WelcomeLogo />
            <RiversTop />
            <div className="w-full flex h-5/6 justify-center">
                <div className="w-10/12 md:w-7/12 h-full lg:h-4/6 p-6 
                    mx-10 my-8 bg-white text-black rounded shadow-xl
                    overflow-y-auto z-50"
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
        </div>
    )
}

export default FooterPage;