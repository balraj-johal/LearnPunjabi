import React, { useState, useEffect } from "react";
import qs from "qs";
import { connect } from "react-redux";
// router imports
import { 
    useParams
} from "react-router-dom";

import axios from "axios";

import {
    setProgress
} from "../../actions/courseActions";

import Task from "./Task";

function Lesson(props) {
    let [lesson, setLesson] = useState();
    let [currentTask, setCurrentTask] = useState(0);
    let [ready, setReady] = useState(false);
    let { id } = useParams();
    
    
    let setLessonComplete = (lessonID) => {
        axios({
            method: 'post',
            url: "http://localhost:3001/api/users/update-progress",
            data: qs.stringify({lessonID: lessonID}),
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

    let nextTask = () => {
        let nextIndex = currentTask+1;
        if (nextIndex >= lesson.tasks.length) {
            setLessonComplete(lesson.id);
            // TODO: redirect here
        } else {
            setCurrentTask(currentTask+1);
        }
    }
    
    useEffect(() => {
        axios({
            method: 'post',
            url: "http://localhost:3001/api/lessons/get-by-id",
            data: qs.stringify({ idToFind : String(id) }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            withCredentials: true
        })
            .then(res => {
                setLesson(res.data.lesson);
                setReady(true);
                console.log(res.data.lesson.tasks[0].text)
            })
            .catch(err => {
                console.log("Lesson get error: ", err);
            })
    }, [id])

    return(
        <>
            LESSON {id}
            {ready ? (
                <div>
                    <Task task={lesson.tasks[currentTask]} />
                    <div onClick={()=>{
                        nextTask();
                    }}>
                        Next &gt;
                    </div>
                </div>
            ) : null}
        </>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
        setProgress
    }
)(Lesson);