import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axiosClient from "../../axiosDefaults";

// import redux actions
import { setProgress } from "../../actions/courseActions";
import { setLessonWrapHeight } from "../../actions/displayActions";

// import ReactPullToRefresh from "react-pull-to-refresh";
import { Canvas } from '@react-three/fiber';
import LessonIcon from "./LessonIcon";
import Particles from "./Particles";

function Course(props) {
    let [loading, setLoading] = useState(true);
    let [courseData, setCourseData] = useState([]);

    let getLessons = async () => {
        try {
            let res = await axiosClient.get("/api/v1/lessons/");
            setCourseData(res.data.overview); 
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    }

    // // refresh data on pull to refresh
    // let onRefresh = async (resolve, reject) => {
    //     setLoading(true);
    //     try {
    //         let res = await axiosClient.get("/api/v1/lessons/");
    //         setCourseData(res.data.overview); 
    //         setLoading(false);
    //         resolve();
    //     } catch (err) {
    //         setLoading(false);
    //         reject();
    //     }
    // }
    
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
        const lessonBased = courseData.length * (205);
        if (courseData.length > 0 && lessonBased > window.innerHeight) {
            return `${lessonBased}px`;
        }
        return `calc(101vh)`;
    }
    useEffect(() => {
        props.setLessonWrapHeight(getWrapHeight());
    }, [courseData])

    if (loading) {
        props.setLessonWrapHeight("100%");
        return <div className="lesson-wrap" style={{ height: "100%" }} />
    }
    return(
        // <ReactPullToRefresh onRefresh={onRefresh} className="w-full h-full" 
        //     // icon={<Loader />} 
        // >
            <div 
                className="lesson-wrap relative" 
                style={{ height: props.lessonWrapHeight }} 
            >
                <div className="animate-fade-in z-10">
                    { courseData.length > 0 ? (
                        courseData.map((lesson) => 
                            <LessonIcon 
                                lesson={lesson}
                                timesCompleted={getTimesCompleted(lesson.id)}
                                key={lesson.id} 
                            />
                        )
                    ) : "Loading failed. Please refresh and try again!" }
                </div>
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <Canvas 
                        dpr={[1, 2]} 
                        camera={{ position: [0, 0, 30], fov: 100 }}
                    >
                        <Particles />
                    </Canvas>
                    <div className={`h-full w-full bg-black absolute top-0
                        ${props.darkMode ? "opacity-30" : "opacity-0"}`} />
                </div>
            </div>
        // </ReactPullToRefresh>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    userProgress: state.auth.user.progress,
    darkMode: state.options.darkMode,
    lessonWrapHeight: state.display.lessonWrapHeight
});

export default connect(
    mapStateToProps,
    { setProgress, setLessonWrapHeight }
)(Course);