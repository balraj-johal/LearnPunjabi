/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import {  useFrame, useThree } from '@react-three/fiber';

export default function Model({ ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF('/Cubone.gltf');

    useFrame(({ clock }) => {
        group.current.rotation.x = clock.getElapsedTime();
    });

    return (
        <group ref={group} {...props} dispose={null}>
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
}

useGLTF.preload('/Cubone.gltf');
