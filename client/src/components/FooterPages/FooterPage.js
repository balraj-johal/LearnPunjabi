import React from "react";
import { Link } from "react-router-dom";
import RiversTop from "../Welcome/RiversSVGs/RiversTop";
import WelcomeLogo from "../Welcome/WelcomeLogo";
import About from "./About";
import Attributions from "./Attributions";
import Privacy from "./Privacy";

function FooterPage(props) {
    return(
        <div className="footer-page h-screen grad-top">
            <WelcomeLogo />
            <RiversTop />
            <div className="w-full flex h-5/6 justify-center">
                <div className="w-10/12 h-full mx-10 my-8 z-50 relative
                    bg-white text-black rounded shadow-xl
                    md:w-7/12 md:h-5/6 md:mt-24 
                    lg:h-5/6 lg:mt-10
                    xl:h-4/5"
                >
                    <div className="h-1/6 p-6">
                        <Link 
                            to="/welcome" 
                            className="text-primary cursor-pointer mb-4 block w-14"
                        >
                            &lt; Back
                        </Link>
                        <h1 className="text-2xl">
                            { props.for }
                        </h1>
                    </div>
                    <div className="h-5/6 p-6 overflow-y-auto">
                        <ContentSwitcher content={props.for} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ContentSwitcher(props) {
    switch (props.content) {
        case "About":
            return <About />;
        case "Privacy And Terms":
            return <Privacy />;
        case "Attributions":
            return <Attributions />;
        default:
            return null;
    }
}


export default FooterPage;