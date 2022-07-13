import React, { useRef, Suspense } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
// import utils
import { degreesToRads } from "../../../utils/math";

import PunjabModel from './PunjabModel';

let ThreeJSElements = (props) => {
    let lightParent = useRef();
    // set initial camera rotation
    useThree(({camera}) => {
        camera.rotation.set(degreesToRads(0), degreesToRads(0), 0);
    });
    
    useFrame(({ clock }) => {
        if (!lightParent.current) return;
        lightParent.current.rotation.y = clock.getElapsedTime();
    });

    return(
        <Suspense fallback={null}>
            <PunjabModel
                rotation={[0.5, 0, 0]} 
                setPageIndex={props.setPageIndex} 
                scrollProgress={props.scrollProgress}
            />
            <mesh ref={lightParent}>
                {/* rotated spotlight intended to highlight detail */}
                <rectAreaLight
                    width={3}
                    height={3}
                    color={"#ffffff"}
                    intensity={5}
                    position={[-2, 5, 5]}
                    lookAt={[0, 0.5, 0]}
                    penumbra={1}
                    castShadow
                />
            </mesh>
                {/* main fill light */}
                <rectAreaLight
                    width={3}
                    height={3}
                    color={"#ffffff"}
                    intensity={10}
                    position={[-2, 2, 5]}
                    lookAt={[0, 0.5, 0]}
                    penumbra={1}
                    castShadow
                />
        </Suspense>
    )
}

export default ThreeJSElements;