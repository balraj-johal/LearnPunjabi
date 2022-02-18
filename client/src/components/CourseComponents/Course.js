import React, {  } from "react";
import { connect } from "react-redux";

import {
    useNavigate
} from "react-router-dom";

import {
    setProgress
} from "../../actions/courseActions";

function Course(props) {
    let navigate = useNavigate();

    let courseData = [
        {
            name: "1",
            id: "1" 
        },
        {
            name: "2",
            id: "2"
        },
        {
            name: "3",
            id: "3"
        },
    ]

    /**
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
     * @param { String } id - lesson id
     * @returns { Number } timesCompleted - number of times lesson has been completed
     */
    let getTimesCompleted = (id) => {
        let outputString;
        if (props.userProgress) {
            props.userProgress.forEach(lesson => {
                if (lesson.id === id) {
                    outputString = String(lesson.timesCompleted);
                }
            });
        }
        return outputString;
    }

    return(
        <div id="course">
            <div className="lesson-wrap">
                {courseData.map((lesson, index) => 
                    <div 
                        className={`lesson ${getLessonStatus(lesson.id) ? "complete" : "incomplete"}`}
                        onClick={() => {
                            navigate(`/lesson/${lesson.id}`);
                        }}
                        key={index} 
                    >
                        Lesson { lesson.name }
                        { getLessonStatus(lesson.id) ? (
                            <p>Times Completed: {getTimesCompleted(lesson.id)}</p>
                        ) : "null" }
                    </div>
                )}
            </div>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    course: state.course,
    userProgress: state.auth.user.progress
});

export default connect(
    mapStateToProps,
    {
        setProgress
    }
)(Course);