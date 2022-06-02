import React, { Suspense, useRef, useEffect, useState } from "react";
import { useInViewport } from 'react-in-viewport';
import { Canvas, useThree } from '@react-three/fiber';

// import utils
import { degreesToRads } from "../../utils/math";

// import components
import ScrollPrompt from "./ScrollPrompt";
import Punjab3 from "./ThreeJS/Punjab3";
import WelcomeLogo from "./WelcomeLogo";
import SignInPrompt from "./SignInPrompt";
import InfoPoints from "./InfoPoints";
import RiversTop from "./RiversSVGs/RiversTop";
import RiversEnd from "./RiversSVGs/RiversEnd";
import RiversMid from "./RiversSVGs/RiversMid";
import Footer from "./Footer";
import PunjabText from "./PunjabText";
import AccountManager from "../AccountManagement/AccountManager";
import Lesson from "../CourseComponents/Lesson";

function Welcome(props) {
    let [showAccounts, setShowAccounts] = useState(false);
    // initialise listeners for scroll tracking
    const top = useRef();
    const scrollArea = useRef();
    const onScroll = e => { top.current = e.target.scrollTop; };

    useEffect(() => { 
        onScroll({ target: scrollArea.current }) ;
    }, []);

    let handleClick = () => {
        setShowAccounts(!showAccounts);
    }

    return(
        <div id="welcome" ref={scrollArea} onScroll={onScroll} >
            <div id="welcome-1" className="welcome-div grad-top h-screen">
                <WelcomeLogo />
                <RiversTop />
                { showAccounts && <AccountManager /> }
                <SignInPrompt handleClick={handleClick} />
                <ScrollPrompt text="Try a lesson on us!" />
            </div>

            <div id="welcome-2" className="welcome-div grad-mid h-screen">
                {/* <InfoPoints /> */}
                <Lesson />
                <RiversMid />
                <ScrollPrompt text="want to learn about Punjab?" />
            </div>
            <div id="welcome-3" className="welcome-div grad-mid h-screen">
                <PunjabInfo ref={top} />
            </div>
            <div id="welcome-4" className="welcome-div grad-end h-screen">
                <RiversEnd />
                <Footer />
            </div>
        </div>
    )
}

let ThreeJSPunjab = React.forwardRef((props, ref) => {
    // set initial camera rotation
    useThree(({camera}) => {
        camera.rotation.set(degreesToRads(0), degreesToRads(0), 0);
    });

    return(
        <Suspense fallback={null}>
            <Punjab3 
                ref={ref} 
                rotation={[0.5, 0, 0]} 
                setPageIndex={props.setPageIndex} 
            />
            <rectAreaLight
                width={3}
                height={3}
                color={"#666666"}
                intensity={54}
                position={[-2, 0, 5]}
                lookAt={[0, 0, 0]}
                penumbra={1}
                castShadow
            />
        </Suspense>
    )
})

let PunjabInfo = React.forwardRef((props, ref) => {
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
                        <ThreeJSPunjab 
                            ref={ref} 
                            setPageIndex={setPageIndex} 
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