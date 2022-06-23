import React, { Suspense, useRef, useEffect, useState } from "react";
import { useInViewport } from 'react-in-viewport';
import { Canvas, useThree } from '@react-three/fiber';

// import utils
import { degreesToRads } from "../../utils/math";

// import components
import ScrollPrompt from "./ScrollPrompt";
import PunjabModel from "./PunjabInfoSection/PunjabModel";
import WelcomeLogo from "./WelcomeLogo";
import SignInPrompt from "./SignInPrompt";
import RiversTop from "./RiversSVGs/RiversTop";
import RiversEnd from "./RiversSVGs/RiversEnd";
import RiversMid from "./RiversSVGs/RiversMid";
import Footer from "./Footer";
import PunjabText from "./PunjabText";
import AccountManager from "../AccountManagement/AccountManager";
import Lesson from "../CourseComponents/Lesson";

import { EXAMPLE_LESSON } from "../../utils/examples";


function Welcome(props) {
    let [showAccounts, setShowAccounts] = useState(false);
    // initialise listeners for scroll tracking
    const top = useRef();
    const main = useRef();

    const onScroll = e => { 
        top.current = e.target.scrollTop;
    };
    useEffect(() => { 
        onScroll({ target: main.current });
        document.title = "Learn Punjabi - Welcome!"
    }, []);

    let toggleShowAccounts = () => {
        setShowAccounts(!showAccounts);
        console.log(main.current)
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
                <AccountManager />
            </div>
        </div> }
            <main 
                id="welcome" 
                ref={main} 
                onScroll={onScroll} 
            >
                <h1 className="visually-hidden">Welcome to Learn Punjabi!</h1>
                <div 
                    aria-label="Welcome section, including start learning button and example lesson link"
                    id="welcome-1" 
                    className="welcome-div grad-top h-full"
                >
                    <WelcomeLogo />
                    <RiversTop />
                    <SignInPrompt handleClick={toggleShowAccounts} />
                    <ScrollPrompt 
                        text="Try a lesson on us!" 
                        scrollTo="#welcome-2"
                    />
                </div>

                <div 
                    aria-label="Example Lesson"
                    id="welcome-2" 
                    className="welcome-div grad-mid h-full"
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
                    <PunjabInfoWrapper ref={top} />
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

let PunjabModelWrapper = React.forwardRef((props, ref) => {
    // set initial camera rotation
    useThree(({camera}) => {
        camera.rotation.set(degreesToRads(0), degreesToRads(0), 0);
    });

    return(
        <Suspense fallback={null}>
            <PunjabModel 
                ref={ref} 
                rotation={[0.5, 0, 0]} 
                setPageIndex={props.setPageIndex} 
            />
        </Suspense>
    )
})

let PunjabInfoWrapper = React.forwardRef((props, ref) => {
    let [pageIndex, setPageIndex] = useState(0);
    let [textVisible, setTextVisible] = useState(false);

    return(
        <>
            <div id="stick">
                <RiversMid />
                <div className="w-[70%] h-full relative">
                    <PunjabText 
                        ref={ref} 
                        pageIndex={pageIndex} 
                        setTextVisible={setTextVisible} 
                        textVisible={textVisible}
                    />
                    <Canvas 
                        dpr={[1, 2]} 
                        camera={{ position: [0, 0, 10], fov: 22 }}
                    >
                        <PunjabModelWrapper 
                            ref={ref} 
                            setPageIndex={setPageIndex} 
                        />
                        <rectAreaLight
                            width={3}
                            height={3}
                            color={"#ffffff"}
                            intensity={54}
                            position={[-2, 0, 5]}
                            lookAt={[0, 0, 0]}
                            penumbra={1}
                            castShadow
                        />
                    </Canvas>
                </div>
            </div>
            <ScrollProgressTracker index={0} setPageIndex={setPageIndex} />
            <ScrollProgressTracker index={1} setPageIndex={setPageIndex} />
            <ScrollProgressTracker index={2} setPageIndex={setPageIndex} />
            <ScrollProgressTracker index={3} setPageIndex={setPageIndex} />
            <ScrollProgressTracker index={4} setPageIndex={setPageIndex} />
        </>
    )
})

// empty component used to determine scroll position for Punjab Info position
function ScrollProgressTracker(props) {
    const ref = useRef();
    const { inViewport } = useInViewport( ref );

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (!inViewport) return;
            props.setPageIndex(props.index)
        }, 200);

        return () => { clearTimeout(timeout) };
    }, [inViewport])

    return <div className="h-screen w-full" ref={ref} />
}


export default Welcome;