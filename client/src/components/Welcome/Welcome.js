import React, { Suspense, useRef, useEffect } from "react";

import { Canvas, useThree } from '@react-three/fiber';

import { degreesToRads } from "../../utils/math";

import ScrollPrompt from "./ScrollPrompt";
import Cubone from "./ThreeJS/Cubone";
import WelcomeLogo from "./WelcomeLogo";
import SignInPrompt from "./SignInPrompt";
import Caption from "./ThreeJS/Caption";

import ThreeThings from "./ThreeThings";
import RiversTop from "./RiversSVGs/RiversTop";
import RiversEnd from "./RiversSVGs/RiversEnd";
import RiversMid from "./RiversSVGs/RiversMid";
import Footer from "./Footer";

function Welcome(props) {
    // initialise listeners for scroll tracking
    const top = useRef();
    const scrollArea = useRef();
    const onScroll = e => { top.current = e.target.scrollTop; };

    useEffect(() => { onScroll({ target: scrollArea.current }) }, []);

    return(
        <div id="welcome" ref={scrollArea} onScroll={onScroll} >
            <div id="welcome-1" className="welcome-div grad-top">
                <WelcomeLogo />
                <RiversTop />
                <SignInPrompt />
                <ScrollPrompt />
            </div>

            <div id="welcome-2" className="welcome-div grad-mid">
                <ThreeThings />
                <RiversMid />
            </div>
            <div id="welcome-3" className="welcome-div grad-mid">
                <div id="stick">
                    <RiversMid />
                    <Canvas 
                        dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}
                    >
                        <ThreeStuff ref={top} />
                    </Canvas>
                </div>
            </div>
            <div id="welcome-4" className="welcome-div grad-end">
                <RiversEnd />
                <Footer />
            </div>
        </div>
    )
}

let ThreeStuff = React.forwardRef((props, ref) => {
    // set initial camera rotation
    useThree(({camera}) => {
        camera.rotation.set(degreesToRads(0), degreesToRads(0), 0);
    });

    return(
        <Suspense fallback={null}>
            <Caption>
                Cubone by Tipatat Chennavasin [CC-BY], via Poly Pizza
            </Caption>
            <Cubone ref={ref} position={[0, 0, 0]} />
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


export default Welcome;