import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosDefaults";

import ReactPullToRefresh from "react-pull-to-refresh";
import Loader from "../Loader";

// import redux actions
import {
    setProgress
} from "../../actions/courseActions";

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
     * @name getLessonStatus
     * @param { String } id - lesson id
     * @returns { boolean } status - is lesson completed or not
     */
    let getLessonStatus = (id) => {
        let status = false;
        if (!props.userProgress) return status;
        props.userProgress.forEach(lesson => {
            if (lesson.id === id) status = true;
        });
        return status;
    }

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
        if (courseData.length > 0) {
            return `${courseData.length * (190)}px`
        } else {
            return `calc(101vh)`
        }
    }

    if (loading) return(
        <div className="lesson-wrap" style={{ height: "100%" }}>
            <Loader />
        </div>
    )
    return(
        // <ReactPullToRefresh onRefresh={onRefresh} className="w-full h-full" 
        //     // icon={<Loader />} 
        // >
            <div className="lesson-wrap" style={{ height: getWrapHeight() }}>
                { courseData.length > 0 ? (
                    courseData.map((lesson, index) => 
                        <LessonIcon 
                            status={getLessonStatus(lesson.id)} 
                            lesson={lesson}
                            timesCompleted={getTimesCompleted(lesson.id)}
                            key={index} 
                        />
                    )
                ) : (
                    <div>
                        Loading failed. Please refresh and try again!
                    </div>
                )}
            </div>
        // </ReactPullToRefresh>
    )
}

function LessonIcon(props) {
    let navigate = useNavigate();
    return(
        <div 
            className={`lesson ${props.status ? "complete" : "incomplete"}`}
            onClick={() => { navigate(`/lesson/${props.lesson.id}`) }}
        >
            { props.lesson.name }<br/>
            <p>{ props.timesCompleted }/{ props.lesson.requiredCompletions }</p>
        </div>
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