import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import axiosClient from "../../axiosDefaults";

// import redux actions
import { setProgress } from "../../actions/courseActions";
import { setLessonWrapHeight } from "../../actions/displayActions";

import { Canvas } from '@react-three/fiber';
import LessonIcon from "./LessonIcon";
import Particles from "./Particles";

function Course(props) {
    let params = useParams();

    let [loading, setLoading] = useState(true);
    let [courseData, setCourseData] = useState([]);

    let getCourse = async () => {
        try {
            const courseEndpoint = `/api/v1/courses/${params.version || ""}`
            let res = await axiosClient.get(courseEndpoint);
            setCourseData(res.data.lessons); 
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    }

    useEffect(() => {
        let reqTimeout = setTimeout(getCourse, 200);

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
     * calculate the height the lessons-wrap elem should be
     * @name getWrapHeight
     * @returns { String } height - string to set height style to
     */
    let getWrapHeight = () => {
        const lessonBased = courseData.length * (205);
        if (courseData.length > 0 && lessonBased > window.innerHeight) {
            return `${lessonBased}px`;
        }
        return `101vh`;
    }
    useEffect(() => {
        props.setLessonWrapHeight(getWrapHeight());
    }, [courseData])

    const getGridPositionClasses = (position) => {
        if (position === "left") return "col-span-2";
        if (position === "right") return "col-span-2";
        if (position === "hidden") return "hidden";
        return "col-start-2 col-end-4";
    }
    const getIconPositionClasses = (position) => {
        if (position === "left") return "icon-2col-left";
        if (position === "right") return "icon-2col-right";
        if (position === "hidden") return "hidden";
        return "mx-auto";
    }


    if (loading) {
        props.setLessonWrapHeight("102%");
        return <div className="lessons-wrap" style={{ height: "102%" }} />
    }
    return(
        <div 
            className="lessons-wrap relative" 
            style={{ height: props.lessonWrapHeight }} 
        >
            <main 
                id="lesson-links" 
                className="animate-fade-in z-10 
                    grid grid-cols-4 auto-cols-fr w-full"
            >
                <h1 className="visually-hidden">Lessons in the Course</h1>
                { courseData.length > 0 ? (
                    courseData.map((lesson) => (
                        <div 
                            className={getGridPositionClasses(lesson.position)} 
                            key={lesson.id} 
                        >
                            <LessonIcon 
                                extraClasses={getIconPositionClasses(lesson.position)}
                                lesson={lesson}
                                timesCompleted={getTimesCompleted(lesson.id)}
                            />
                        </div>
                    ))
                ) : "Loading failed. Please refresh and try again!" }
            </main>
            <div className="absolute top-0 left-0 w-full h-full z-0">
                { props.showParticles && <Canvas 
                        dpr={[1, 2]} 
                        camera={{ position: [0, 0, 30], fov: 100 }}
                    >
                        <Particles />
                    </Canvas>
                }
            </div>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    userProgress: state.auth.user.progress,
    darkMode: state.options.darkMode,
    lessonWrapHeight: state.display.lessonWrapHeight,
    vh: state.display.singleVH,
});

export default connect(
    mapStateToProps,
    { setProgress, setLessonWrapHeight }
)(Course);