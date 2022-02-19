import React, {  } from "react";
import { connect } from "react-redux";
import {
    useNavigate
} from "react-router-dom";

// import redux actions
import {
    setProgress
} from "../../actions/courseActions";

function Course(props) {
    // TODO: change this to get data from the server
    let courseData = [
        {
            name: "1",
            id: "1" ,
            requiredCompletions: 5,
        },
        {
            name: "2",
            id: "2",
            requiredCompletions: 5,
        },
        {
            name: "3",
            id: "3",
            requiredCompletions: 5,
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
                    <LessonIcon 
                        status={getLessonStatus(lesson.id)} 
                        lesson={lesson}
                        timesCompleted={getTimesCompleted(lesson.id)}
                        key={index} 
                    />
                )}
            </div>
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