/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useState, useRef, useEffect } from 'react';
import { useInViewport } from 'react-in-viewport';
import { Canvas } from "@react-three/fiber";

import RiversMid from "../RiversSVGs/RiversMid";
import ThreeJSElements from './ThreeJSElements';
import PunjabText from "./PunjabText";

let PunjabInfoCanvas = React.forwardRef((props, ref) => {
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
                        <ThreeJSElements
                            setPageIndex={setPageIndex} 
                            scrollProgress={props.scrollProgress}
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
// TODO: remove and refactor Punjab Text to be driven by scroll progress value
function ScrollProgressTracker(props) {
    const ref = useRef();
    const { inViewport } = useInViewport( ref );

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (!inViewport) return;
            props.setPageIndex(props.index);
        }, 200);

        return () => { clearTimeout(timeout) };
    }, [inViewport])

    return (
        <div 
            id={`scroll-progress-tracker-${props.index}`} 
            className="h-screen w-full" 
            ref={ref} 
        />
    )
}

export default PunjabInfoCanvas;