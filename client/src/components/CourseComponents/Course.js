import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import axios from "axios";
import qs from 'qs';

import {
    setProgress
} from "../../actions/courseActions";

function Course(props) {

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

    let updateProgress = (progressToAdd) => {
        axios({
            method: 'post',
            url: "http://localhost:3001/api/progress/update",
            data: qs.stringify(progressToAdd),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            withCredentials: true
        })
            .then(res => {
                console.log(res.data.newProgress);
                props.setProgress(res.data.newProgress);
            })
            .catch(err => {
                console.log(err);
            })
    }
    let getLessonStatus = (id) => {
        let string = "not completed"
        props.course.progress.forEach(lesson => {
            if (lesson.id === id) {
                string = "completed";
            }
        });
        return string;
    }

    return(
        <div id="course">
            <h1 id="course-name">Punjabi 101</h1>
            {courseData.map((lesson, index) => 
                <div className="lesson" key={index} onClick={() => {
                    updateProgress(lesson);
                }}>
                    { lesson.name }
                    { getLessonStatus(lesson.id) }
                </div>
            )}
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    course: state.course
});

export default connect(
    mapStateToProps,
    {
        setProgress
    }
)(Course);