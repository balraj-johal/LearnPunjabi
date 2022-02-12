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

import TaskManager from "./TaskManager";

function Lesson(props) {
    let [lesson, setLesson] = useState();
    let [currentTask, setCurrentTask] = useState(0);
    let [answerTracking, setAnswerTracking] = useState({
        noCorrect: 0,
        noWrong: 0
    });
    let [ready, setReady] = useState(false);
    let { id } = useParams();
    
    // get lesson data from server by id
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
            })
            .catch(err => {
                console.log("Lesson get error: ", err);
            })
    }, [id])
    
    /**
     * @name getPercentCorrect
     * @returns {String} - returns a string describing the user's correct answer score
     */
    let getPercentCorrect = () => {
        let total = answerTracking.noCorrect + answerTracking.noWrong;
        console.log(total);
        return String((answerTracking.noCorrect / total) * 100) + "%";
    }

    let setLessonComplete = (lessonID) => {
        alert(getPercentCorrect());
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

    let submitAnswer = (correct) => {
        if (correct) {
            setAnswerTracking({
                noCorrect: answerTracking.noCorrect += 1,
                noWrong: answerTracking.noWrong
            });
            nextTask();
        } else {
            setAnswerTracking({
                noCorrect: answerTracking.noCorrect,
                noWrong: answerTracking.noWrong += 1
            });
        }
        
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
    

    return(
        <>
            LESSON {id}
            {ready ? (
                <TaskManager 
                    taskData={lesson.tasks[currentTask]}
                    submitAnswer={submitAnswer}
                />
            ) : <LessonLoader />}
        </>
    )
}

function LessonLoader(props) {
    return(
        <>Loader</>
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