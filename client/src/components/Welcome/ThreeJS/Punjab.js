/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/Punjab.gltf')
    return (
        <group ref={group} {...props} dispose={null} >
            <mesh geometry={nodes.Map_rivers001.geometry} material={materials['Map_rivers.001']} />
        </group>
    )
}

useGLTF.preload('/Punjab.gltf')
