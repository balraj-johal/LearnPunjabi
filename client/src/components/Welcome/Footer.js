import React, {  } from "react";

import instagramIcon from "../../res/icons/socials/instagram.png";
import twitterIcon from "../../res/icons/socials/twitter.png";

function Footer(props) {
    return(
        <div 
            id="footer" 
            role="footer"
            className="absolute bottom-0 h-1/4 bg-black bg-opacity-20 w-full
                flex flex-col justify-center px-8"
        >
            <div 
                id="links"
                className="flex flex-col justify-evenly h-4/6"
            >
                <FooterLink to="about" text="About" />
                <FooterLink to="privacy" text="Privacy and Terms" />
                <FooterLink to="attributions" text="Attributions" />
                <div className="flex">
                    <SocialIcon type="Instagram" />
                    <SocialIcon type="Twitter" />
                </div>
            </div>
        </div>
    )
}

function FooterLink(props) {
    return(
        <div id={`footer-link-${props.to}`} className="text-md md:text-xl">
            <a href={`welcome/${props.to}`}>
                {props.text}
            </a>
        </div>
    )
}

function SocialIcon(props) {
    let link, imgSrc;
    switch (props.type) {
        case "Instagram":
            link = "https://www.flaticon.com/premium-icon/instagram_3661391";
            imgSrc = instagramIcon;
            break;
        case "Twitter":
            link = "https://www.flaticon.com/free-icon/twitter-sign_25347";
            imgSrc = twitterIcon;
            break;
        // case "TikTok":
        //     link = "https://www.flaticon.com/premium-icon/instagram_3661391";
        //     imgSrc = instagramIcon;
        //     break;
        default:
            break;
    }

    return(
        <a href={link} className="mr-2 my-1" target="_blank">
            <img src={imgSrc} className="w-8 h-8" alt={`${props.type} logo`} />
        </a>
    )
}

export default Footer;