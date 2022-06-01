import React, { Suspense, useMemo, useRef } from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { randNo } from "../../utils/math";

function Particles(props) {
    const mesh = useRef();
  
    let count = 10000;
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const time = randNo(0, 100);
            const factor = randNo(0.1, 1.5);
            const speed = randNo(0.01, 0.015) / 2;
            const x = randNo(-30, 30);
            const y = randNo(-50, 500);
            const z = randNo(0, 5);
            temp.push({ time, factor, speed, x, y, z });
        }
        return temp;
    }, [count]);

    // create empty three object to use for movement calculations
    // the transforms of which are then used to update instanced geometry
    const dummy = useMemo(() => new THREE.Object3D(), []);
  
    useFrame(({ camera }) => {
        particles.forEach((particle, index) => {
            let { factor, speed, x, y, z } = particle;
    
            // Update the particle time
            const t = (particle.time += speed);
    
            // // Update the particle y position based on the time
            dummy.position.set(
                x,
                y + t * factor,
                z
            );
    
            // Derive an oscillating value used for particle rotation
            const s = Math.cos(t);
            const scaleFactor = 0.5 * factor;
            dummy.scale.set(scaleFactor, scaleFactor, scaleFactor);
            dummy.rotation.set(s * 2, s * 2, s * 2);
            dummy.updateMatrix();
    
            // apply the matrix to the instanced item
            mesh.current.setMatrixAt(index, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return(
        <Suspense fallback={null}>
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <sphereBufferGeometry args={[0.2, 10, 10]} />
                <meshBasicMaterial color="#eeeeee" />
            </instancedMesh>
        </Suspense>
    )
}

export default Particles;