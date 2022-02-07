import React, { useState } from "react";

import { connect } from "react-redux";
import axios from "axios";
import qs from 'qs';

function Course(props) {
    let [progress, setProgress] = useState([]);
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
                console.log(res);
                alert("Register successful.");
            })
            .catch(err => {
            })
    }

    return(
        <div id="course">
            <h1 id="course-name">{props.course}</h1>
            {courseData.map((lesson, index) => 
                <div className="lesson" key={index} onClick={() => {
                    updateProgress(lesson);
                }}>
                    {lesson.name}
                </div>
            )}
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
    }
)(Course);