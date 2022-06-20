/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { lerp } from "../../../utils/math";

const RIVER_END_Y = 0.01;

let PunjabModel = React.forwardRef(({ ...props }, ref) => {
    const group = useRef();
    const river1 = useRef();
    const river2 = useRef();
    const { nodes, materials } = useGLTF('/Punjab4-transformed.glb');
    
    let [hovering, setHovering] = useState(false);
    let [stuck, setStuck] = useState(false);
    let [r1label, showR1Label] = useState(false);

    let [alpha, setAlpha] = useState(0);
    let lerpedPos;

    useFrame(({ clock }) => {
        // rotate based on scroll
        // group.current.rotation.y = 
        //     -ref.current / 500 - (clock.getElapsedTime() * 0.1);
        // river1.current.position.y = -ref.current / 1500;
        setAlpha(Math.min(1, (ref.current - 1000) / 1000));
        lerpedPos = lerp(RIVER_END_Y + 1.0, RIVER_END_Y, alpha);
        // river1.current.position.y = lerpedPos;
        // if (hovering) group.current.rotation.x += 10;
    });

    /** keep hover behaviour going for a certain amount of time onClick.
     * @name stickHoverOnClick
     */
    let stickHoverOnClick = () => {
        setHovering(true);
        setStuck(true);
        setTimeout(() => {
            setHovering(false);
            setStuck(false);
        }, 2000);
    }
    let handlePointerLeave = e => {
        if (!stuck) setHovering(false);
    }

    return (
        <group 
            ref={group} 
            {...props} 
            dispose={null}
            onClick={ e => stickHoverOnClick() }
            onPointerEnter={ e => setHovering(true) }
            onPointerLeave={ e => handlePointerLeave(e) }
            position={[0, 0.5, 0]}
        >
            <mesh 
                geometry={nodes.Plane.geometry} 
                material={materials['Material.001']} 
            />
            {/* <mesh 
                ref={river1} 
                geometry={nodes.River1.geometry} 
                position={[0, -0.01, 0]} 
                rotation={[0, 0.66, 0]} 
                look
                scale={0.57} 
                onPointerEnter={() => {
                    console.log("showing")
                    showR1Label(true)
                }}
                onPointerLeave={() => {
                    console.log("hiding")
                    showR1Label(false)
                }}
            >
                <meshBasicMaterial 
                    color={0x00a3ff}
                    opacity={Math.min(1, alpha * 2 - 1)} 
                    transparent 
                />
            </mesh>
            { r1label && <Caption lookAt={props.cameraRef}>Test</Caption>}
            <mesh 
                ref={river2} 
                geometry={nodes.River2.geometry} 
                material={nodes.River2.material} 
                position={[0, -0.01, 0]} 
                rotation={[0, -0.75, 0]}
                scale={0.57} 
            /> */}
        </group>
    )
})

export default PunjabModel;

useGLTF.preload('/Punjab4-transformed.glb')