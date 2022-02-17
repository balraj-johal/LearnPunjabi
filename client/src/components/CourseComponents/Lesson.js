import React, { useState, useEffect } from "react";
import qs from "qs";
import { connect } from "react-redux";
// router imports
import { 
    useParams,
    useNavigate,

} from "react-router-dom";

import axios from "axios";

import {
    setProgress
} from "../../actions/courseActions";
// auth actions
import {
    getUserData,
} from "../../actions/authActions";

import TaskManager from "./TaskManager";

function Lesson(props) {
    let navigate = useNavigate();

    let [lesson, setLesson] = useState();
    let [currentTask, setCurrentTask] = useState(0);
    let [answerTracking, setAnswerTracking] = useState({
        noCorrect: 0,
        noWrong: 0
    });
    let [ready, setReady] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        if (!props.isAuthenticated) {
            navigate("/account");
        }
    }, [])

    /**
     * Returns a shuffled array.
     * @param {Array} arr - the array to shuffle.
     * @returns {Array} shuffled array.
     */
    let shuffle = (arr) => {
        return arr.sort(() => Math.random() - 0.5)
    }
    
    // get lesson data from server by id
    useEffect(() => {
        axios({
            method: 'get',
            url: `/api/lessons/get-by-id/${String(id)}`,
            // data: qs.stringify({ idToFind : String(id) }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            withCredentials: true
        })
            .then(res => {
                let resLesson = res.data.lesson;
                // console.log("res lesson ", resLesson.tasks)
                resLesson.tasks = shuffle(resLesson.tasks);
                // console.log("shuffled ", resLesson.tasks)
                setLesson(resLesson);
                setReady(true);
            })
            .catch(err => {
                console.log("Lesson get error: ", err);
            })
    }, [id])
    
    /** calculate users percentage of correct answers
     * @name getPercentCorrect
     * @returns {String} - string describing calculated percentage
     */
    let getPercentCorrect = () => {
        let total = answerTracking.noCorrect + answerTracking.noWrong;
        console.log(total);
        return String((answerTracking.noCorrect / total) * 100) + "%";
    }

    /** update user progress for a specific lesson
     * @name setLessonComplete
     * @param  {String} lessonID
     */
    let setLessonComplete = (lessonID) => {
        alert(getPercentCorrect());
        axios({
            method: 'post',
            url: "/api/users/update-progress",
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

    /** handle and track a valid or invalid answer
     * @name submitAnswer
     * @param  {Boolean} correct - was user's answer correct
     */
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
    /** proceed onto the next task in the lesson
     * @name nextTask
     */
    let nextTask = () => {
        let nextIndex = currentTask+1;
        if (nextIndex >= lesson.tasks.length) {
            setLessonComplete(lesson.id);
            props.getUserData();
            navigate("/");
        } else {
            setCurrentTask(nextIndex);
        }
    }
    
    return(
        <>
            {/* LESSON {id} */}
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {
        setProgress,
        getUserData
    }
)(Lesson);