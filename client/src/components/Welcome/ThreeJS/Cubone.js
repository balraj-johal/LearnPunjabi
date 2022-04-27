/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

let Cubone = React.forwardRef(({ ...props }, ref) => {
    let [hovering, setHovering] = useState(false);
    let [stuck, setStuck] = useState(false);

    const { viewport } = useThree();
    const group = useRef();
    const { nodes, materials } = useGLTF('/Cubone.gltf');

    useFrame(({ clock }) => {
        let viewHeight = window.innerHeight;
        // rotate based on scroll
        group.current.rotation.y = -ref.current / 500;
        // if past block 3 auto rotate
        if (ref.current > 3 * viewHeight) group.current.rotation.z = clock.getElapsedTime();

        if (hovering) group.current.rotation.x += 10;
    });

    let stickHoverOnClick = () => {
        setHovering(true);
        setStuck(true);
        setTimeout(() => {
            setHovering(false);
            setStuck(false);
        }, 2000);
    }
    let handlePointerLeave = (e) => {
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
        >
            <mesh geometry={nodes.mesh_0.geometry} material={materials.mat21} />
            <mesh geometry={nodes.mesh_0_1.geometry} material={materials.mat23} />
            <mesh geometry={nodes.mesh_1.geometry} material={materials.mat13} />
            <mesh geometry={nodes.mesh_1_1.geometry} material={materials.mat18} />
            <mesh geometry={nodes.mesh_1_2.geometry} material={materials.mat21} />
            <mesh geometry={nodes.group1868352797.geometry} material={materials.mat21} />
            <mesh geometry={nodes.mesh_3.geometry} material={materials.mat21} />
            <mesh geometry={nodes.mesh_3_1.geometry} material={materials.mat11} />
            <mesh geometry={nodes.mesh_3_2.geometry} material={materials.mat23} />
            <mesh geometry={nodes.mesh_4.geometry} material={materials.mat23} />
            <mesh geometry={nodes.mesh_4_1.geometry} material={materials.mat21} />
            <mesh geometry={nodes.mesh_4_2.geometry} material={materials.mat11} />
        </group>
    )
})

export default Cubone;

useGLTF.preload('/Cubone.gltf');