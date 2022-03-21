import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    useNavigate
} from "react-router-dom";
import axiosClient from "../../axiosDefaults";
import Loader from "../Loader";

// import redux actions
import {
    setProgress
} from "../../actions/courseActions";

function Course(props) {
    let [courseData, setCourseData] = useState([]);

    useEffect(() => {
        axiosClient.get("/api/v1/lessons/overview")
            .then(res => { setCourseData(res.data.overview); })
            .catch(err => { console.log(err); })
    }, [])

    /**
     * Returns true if lesson has been completed at least once
     * @name getLessonStatus
     * @param { String } id - lesson id
     * @returns { boolean } status - is lesson completed or not
     */
    let getLessonStatus = (id) => {
        let status = false;
        if (props.userProgress) {
            props.userProgress.forEach(lesson => {
                if (lesson.id === id) {
                    status = true;
                }
            });
        }
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
     * @returns { tring } height - string to set height style to
     */
    let getWrapHeight = () => {
        if (courseData.length > 0) {
            return `${courseData.length * (182)}px`
        } else {
            return `calc(100vh - 99px)`
        }
    }

    return(
        <div className="lesson-wrap" style={{
            height: getWrapHeight()
        }}>
            { courseData.length > 0 ? (
                courseData.map((lesson, index) => 
                    <LessonIcon 
                        status={getLessonStatus(lesson.id)} 
                        lesson={lesson}
                        timesCompleted={getTimesCompleted(lesson.id)}
                        key={index} 
                    />
                )
            ) : <Loader /> }
        </div>
    )
}

function LessonIcon(props) {
    let navigate = useNavigate();
    return(
        <div 
            className={`lesson ${props.status ? "complete" : "incomplete"}`}
            onClick={() => {
                navigate(`/lesson/${props.lesson.id}`);
            }}
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