import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";


// import components
import ScrollPrompt from "./ScrollPrompt";
import WelcomeLogo from "./WelcomeLogo";
import CallToAction from "./CallToAction";
import RiversTop from "./RiversSVGs/RiversTop";
import RiversEnd from "./RiversSVGs/RiversEnd";
import RiversMid from "./RiversSVGs/RiversMid";
import Footer from "./Footer";
import AccountManager from "../AccountManagement/AccountManager";
import Lesson from "../CourseComponents/Lesson";

import { EXAMPLE_LESSON } from "../../utils/examples";

import { setWelcomeScrollProgress } from "../../actions/displayActions";
import PunjabInfoCanvas from "./PunjabInfoSection/PunjabInfoCanvas";

function Welcome(props) {
    let [showAccounts, setShowAccounts] = useState(false);
    // initialise listeners for scroll tracking
    const top = useRef();
    const main = useRef();

    let getScrollProgress = () => {
        let scrollWrapper = document.getElementById("welcome-3");
        let welcome = document.getElementById("welcome");
        let offset = welcome.scrollTop - scrollWrapper.offsetTop;
        let pageHeight = scrollWrapper.scrollHeight / (5 + 1);
        props.setWelcomeScrollProgress(offset/pageHeight);
    }

    const onScroll = e => { 
        if (e.target) top.current = e.target.scrollTop;
        getScrollProgress();
    };
    
    useEffect(() => { 
        onScroll({ target: main.current });
        document.title = "Learn Punjabi - Welcome!";

        window.addEventListener("resize", getScrollProgress);
        return () => {
            window.removeEventListener("resize", getScrollProgress);
        }
    }, []);

    let toggleShowAccounts = () => {
        setShowAccounts(!showAccounts);
        if (!showAccounts) return main.current.setAttribute("inert", "true");
        main.current.removeAttribute("inert");
    }

    return(
        <>
        { showAccounts && <div 
            className="w-screen h-screen absolute 
                flex justify-center items-center"
        >
            <button
                id="hide-account-manager" 
                onClick={() => { toggleShowAccounts() }}
                className="w-screen h-screen absolute z-[75]
                    bg-black bg-opacity-30"
            />
            <div 
                className="w-11/12 h-5/6 rounded 
                    flex justify-center items-center overflow-hidden"
                style={{marginBottom: "env(safe-area-inset-bottom)"}}
            >
                <AccountManager welcome={true} />
            </div>
        </div> }
            <main 
                id="welcome" 
                ref={main} 
                onScroll={onScroll}
                className="relative"
            >
                <h1 className="visually-hidden">Welcome to Learn Punjabi!</h1>
                <div 
                    aria-label="Welcome section, 
                        including start learning button and example lesson link"
                    id="welcome-1" 
                    className="welcome-div grad-top h-full"
                >
                    <WelcomeLogo />
                    <RiversTop />
                    <CallToAction 
                        text="Start Learning" 
                        handleClick={toggleShowAccounts} 
                    />
                    <ScrollPrompt 
                        text="Try a lesson on us!" 
                        scrollTo="#welcome-2"
                    />
                </div>

                <div 
                    aria-label="Example Lesson"
                    id="welcome-2" 
                    className="welcome-div grad-mid h-full animate-fade-in"
                >
                    <Lesson lessonOverride={EXAMPLE_LESSON} />
                    <RiversMid />
                    <ScrollPrompt 
                        text="Want to learn about Punjab?" 
                        scrollTo="#welcome-3"
                    />
                </div>
                <div 
                    aria-label="3D animation of Punjab's history through the years"
                    id="welcome-3" 
                    className="welcome-div grad-mid h-full"
                >
                    <PunjabInfoCanvas ref={top}
                        scrollProgress={props.welcomeScrollProgress} />
                </div>
                <div 
                    id="welcome-end" 
                    className="welcome-div grad-end h-full"
                >
                    <RiversEnd />
                    <Footer />
                </div>
            </main>
        </>
    )
}


const mapStateToProps = state => ({
    welcomeScrollProgress: state.display.welcomeScrollProgress,
});

export default connect(
    mapStateToProps,
    { setWelcomeScrollProgress }
)(Welcome);