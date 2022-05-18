import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { connect } from "react-redux";
import axiosClient from "../../axiosDefaults";

// import ReactPullToRefresh from "react-pull-to-refresh";
import LessonIcon from "./LessonIcon";

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

// import redux actions
import { setProgress } from "../../actions/courseActions";

function Course(props) {
    let [loading, setLoading] = useState(true);
    let [courseData, setCourseData] = useState([]);
    let [showParticles, setShowParticles] = useState(true);

    let getLessons = async () => {
        try {
            let res = await axiosClient.get("/api/v1/lessons/");
            setCourseData(res.data.overview); 
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    }

    let onRefresh = async (resolve, reject) => {
        setLoading(true);
        try {
            let res = await axiosClient.get("/api/v1/lessons/");
            setCourseData(res.data.overview); 
            setLoading(false);
            resolve();
        } catch (err) {
            setLoading(false);
            reject();
        }
    }
    
    useEffect(() => {
        let reqTimeout = setTimeout(getLessons, 200);

        return () => { clearTimeout(reqTimeout) }
    }, [])

    /**
     * Returns true if lesson has been completed at least once
     * @name getTimesCompleted
     * @param { String } id - lesson id
     * @returns { Number } timesCompleted - number of times lesson has been completed
     */
    let getTimesCompleted = (id) => {
        let number = 0;
        if (props.userProgress) {
            props.userProgress.forEach(lesson => {
                if (lesson.id === id) {
                    number = lesson.timesCompleted;
                }
            });
        }
        return number;
    }

    /**
     * calculate the height the lesson-wrap elem should be
     * @name getWrapHeight
     * @returns { String } height - string to set height style to
     */
    let getWrapHeight = () => {
        if (courseData.length > 0) return `${courseData.length * (205)}px`
        return `calc(101vh)`
    }

    if (loading) return(
        <div className="lesson-wrap" style={{ height: "110%" }}>
        </div>
    )
    return(
        // <ReactPullToRefresh onRefresh={onRefresh} className="w-full h-full" 
        //     // icon={<Loader />} 
        // >
            <div 
                className="lesson-wrap relative" 
                style={{ height: getWrapHeight() }} 
            >
                <div className="animate-fade-in z-10">
                    { courseData.length > 0 ? (
                        courseData.map((lesson, index) => 
                            <LessonIcon 
                                lesson={lesson}
                                timesCompleted={getTimesCompleted(lesson.strId)}
                                key={index} 
                            />
                        )
                    ) : (
                        <>
                            Loading failed. Please refresh and try again!
                        </>
                    )}
                </div>
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <Canvas 
                        dpr={[1, 2]} 
                        camera={{ position: [0, 0, 30], fov: 100 }}
                    >
                        { showParticles ? <Particles /> : null }
                    </Canvas>
                </div>
            </div>
        // </ReactPullToRefresh>
    )
}

function Particles(props) {
    const mesh = useRef();

    let randNo = (min, max) => {
        return Math.random() * (max - min) + min;
    }
  
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

    // TODO = convert to redux stored ref
    let scrollElem = document.getElementById("internal-main")
  
    useFrame(({ camera }) => {
        // camera.position.set(camera.position.x, 0 - scrollElem.scrollTop/50, camera.position.z);
        // camera.position.y = 0 - scrollElem/1000

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


//pull relevant props from redux state
const mapStateToProps = state => ({
    userProgress: state.auth.user.progress,
});

export default connect(
    mapStateToProps,
    {
        setProgress
    }
)(Course);