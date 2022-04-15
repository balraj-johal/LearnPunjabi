import React, { Suspense, useRef, useEffect } from "react";

import { Canvas, useThree } from '@react-three/fiber';
// import { LayerMaterial, Depth, Noise } from 'lamina'

import ScrollPrompt from "./ScrollPrompt";
import Cubone from "./ThreeJS/Cubone";
import Logo2 from "./Logo2";
import RiversEnds from "./RiversSVGs/RiversEnds";
import SignInPrompt from "./SignInPrompt";
import Caption from "./ThreeJS/Caption";
import RiversMid from "./RiversSVGs/RiversMid";

import { degreesToRads } from "../../utils/math";

const NO_PAGES = 3;
function Welcome(props) {
    // initialise listeners for scroll tracking
    const top = useRef();
    const scrollArea = useRef();
    const onScroll = e => { top.current = e.target.scrollTop; };
    useEffect(() => {
        onScroll({ target: scrollArea.current });
    }, [])
    

    return(
        <div id="welcome" ref={scrollArea} onScroll={onScroll} >
            <div id="welcome-1" className="welcome-div grad-top">
                <Logo2 />
                <RiversEnds />
                <SignInPrompt />
                <ScrollPrompt />
            </div>

            <div id="welcome-2" className="welcome-div grad-mid">
                <div id="three-things">
                    <div id="thing-1" className="thing">
                        <div className="title">TITLE</div>
                        <div className="text">Learn Punjabi quickly and effectively using our intuitive learning system.</div>
                    </div> 
                    <div id="thing-2" className="thing">
                        <div className="title">TITLE</div>
                        <div className="text">Learn Punjabi quickly and effectively using our intuitive learning system.</div>
                    </div> 
                    <div id="thing-3" className="thing">
                        <div className="title">TITLE</div>
                        <div className="text">Learn Punjabi quickly and effectively using our intuitive learning system.</div>
                    </div> 
                </div>
                <RiversMid />
            </div>
            <div id="welcome-3" className="welcome-div grad-mid">
                <div id="stick">
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}>
                        <ThreeStuff />
                    </Canvas>
                </div>
            </div>
            <div id="welcome-4" className="welcome-div grad-end">
                
            </div>
        </div>
    )
}

function ThreeStuff(props) {
    const { viewport } = useThree();
    // set initial camera rotation
    useThree(({camera}) => {
        camera.rotation.set(degreesToRads(-5), degreesToRads(1), 0);
    });
    return(
        <Suspense fallback={null}>
            <Cubone position={[0, 0, 0]} />
            <Cubone position={[0, viewport.height, 0]} />
            <Cubone position={[0, viewport.height * 1, 0]} />
            <Caption>Cubone by Tipatat Chennavasin [CC-BY], via Poly Pizza</Caption>
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
}



export default Welcome;