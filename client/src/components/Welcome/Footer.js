import React, {  } from "react";

function Footer(props) {
    return(
        <div 
            id="footer" 
            role="footer"
            className="absolute bottom-0 h-1/6 bg-black bg-opacity-20 w-full
                flex flex-col justify-center px-8"
        >
            <div 
                id="links"
                className="flex flex-col justify-evenly h-4/6"
            >
                <FooterLink to="about" text="About" />
                <FooterLink to="privacy" text="Privacy and Terms" />
                <FooterLink to="socials" text="Socials" />
                <FooterLink to="attributions" text="Attributions" />
            </div>
        </div>
    )
}

function FooterLink(props) {
    return(
        <div id={`footer-link-${props.to}`} className="">
            <a href={`welcome/page/${props.to}`}>
                {props.text}
            </a>
        </div>
    )
}

export default Footer;