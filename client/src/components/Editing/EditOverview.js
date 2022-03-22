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

function EditOverview(props) {
    let [courseData, setCourseData] = useState([]);

    useEffect(() => {
        axiosClient.get("/api/v1/lessons/overview")
            .then(res => { setCourseData(res.data.overview); })
            .catch(err => { console.log(err); })
    }, []);

    /**
     * calculate the height the lesson-wrap elem should be
     * @name getWrapHeight
     * @returns { String } height - string to set height style to
     */
    let getWrapHeight = () => {
        if (courseData.length > 0) {
            return `${courseData.length * (182)}px`
        } else {
            return `calc(100vh - 99px)`
        }
    }

    return(
        <div 
            className="edit-wrap" 
            style={{ height: getWrapHeight() }}
        >
            { courseData.length > 0 ? (
                courseData.map((lesson, index) => 
                    <LessonIcon 
                        lesson={lesson}
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
            className="edit-overview"
            id={`entry-${props.lesson.id}`}
            onClick={() => {
                navigate(`/edit/${props.lesson.id}`);
            }}
        >
            { props.lesson.name }
            <div className="edit-button">
                Edit
            </div>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    userProgress: state.auth.user.progress,
});

export default connect(
    mapStateToProps,
    { setProgress }
)(EditOverview);