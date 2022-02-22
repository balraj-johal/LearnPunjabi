import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import qs from "qs";

//import redux actions
import { setProgress } from "../../actions/courseActions";
import { getUserData } from "../../actions/authActions";

// import components
import TaskManager from "./TaskManager";
import Loader from "../Loader";


function Lesson(props) {
    let navigate = useNavigate();
    let { id } = useParams();

    // configure states
    let [lesson, setLesson] = useState();
    let [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    let [ready, setReady] = useState(false);
    let [answerTracking, setAnswerTracking] = useState({
        noCorrect: 0,
        noWrong: 0,
    });
    let [mistakeTracker, setMistakeTracker] = useState([]);

    /**
     * Returns a shuffled array.
     * @param {Array} arr - the array to shuffle.
     * @returns {Array} shuffled array.
     */
    let shuffle = (arr) => {
        return arr.sort(() => Math.random() - 0.5)
    };
    
    // when lesson ID is updated, get and save lesson data from server
    useEffect(() => {
        axios.get(`/api/lessons/get-by-id/${String(id)}`, {withCredentials: true})
            .then(res => {
                let lessonData = res.data.lesson;
                // shuffle lesson tasks
                lessonData.tasks = shuffle(lessonData.tasks);
                // add data for the lesson end screen
                lessonData.tasks.push({
                    taskID: "end",
                    text: "butt3",
                    type: "End",
                });
                // save modified lesson data to component state
                setLesson(lessonData);
                setReady(true);
            })
            .catch(err => { console.log("Lesson get error: ", err); })
    }, [id]);

    /**
     * Updates the mistakeTracker state, adding on a newly failed task
     * @param  {Object} task
     */
    let updateMistakes = (task) => {
        if (!mistakeTracker.includes(task)) {
            setMistakeTracker(mistakeTracker => [...mistakeTracker, task]);
        }
    }
    
    /**
     * calculate users percentage of correct answers
     * @name getPercentCorrect
     * @returns {String} - string describing calculated percentage
     */
    let getPercentCorrect = () => {
        let total = answerTracking.noCorrect + answerTracking.noWrong;
        return String((answerTracking.noCorrect / total) * 100) + "%";
    }

    /** 
     * handle and track a valid or invalid answer
     * @name submitAnswer
     * @param  {Boolean} correct - was user's answer correct
     */
    let submitAnswer = (correct) => {
        if (correct) {
            setAnswerTracking({
                noCorrect: answerTracking.noCorrect += 1,
                ...answerTracking
            });
            nextTask();
        } else {
            let currentTaskData = lesson.tasks[currentTaskIndex];
            updateMistakes(currentTaskData);
            setAnswerTracking({
                noWrong: answerTracking.noWrong += 1,
                ...answerTracking
            });
        }
        
    }
    
    /** 
     * proceed onto the next task in the lesson
     * @name nextTask
     */
    let nextTask = () => {
        let nextIndex = currentTaskIndex+1;
        if (nextIndex >= lesson.tasks.length) {
            endLesson(lesson.id);
            props.getUserData();
            navigate("/");
        } else {
            setCurrentTaskIndex(nextIndex);
        }
    }

    /** 
     * update user progress for a specific lesson
     * @name endLesson
     * @param  {String} lessonID
     */
    let endLesson = (lessonID) => {
        // TODO: submit tracked mistakes here
        let mistakes = answerTracking.wrongTasks;
        console.log("mistakes: ", mistakes);
        
        axios({
            method: 'post',
            url: "/api/users/update-progress",
            data: qs.stringify({lessonID: lessonID}),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        })
            .then(res => {
                props.setProgress(res.data.newProgress);
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    return(
        <>
            { ready ? (
                <TaskManager
                    taskData={lesson.tasks[currentTaskIndex]}
                    submitAnswer={submitAnswer}
                    stats={getPercentCorrect()}
                />
            ) : <Loader /> }
        </>
    )
}



//pull relevant props from redux state
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.loading
});

export default connect(
    mapStateToProps,
    {
        setProgress,
        getUserData
    }
)(Lesson);