import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import axiosClient from "../../axiosDefaults";
import qs from "qs";

//import redux actions
import { setProgress } from "../../actions/courseActions";
import { getUserData } from "../../actions/authActions";

// import components
import TaskManager from "./TaskManager";

import { _shuffle } from "../../utils/arrays";
import ProgressBar from "./ProgressBar";

function Lesson(props) {
    let navigate = useNavigate();
    let { id } = useParams();

    // initialise states
    let [lesson, setLesson] = useState();
    let [ready, setReady] = useState(false);
    let [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    let [answerTracking, setAnswerTracking] = useState({ noCorrect: 0, noWrong: 0, });
    let [mistakeTracker, setMistakeTracker] = useState([]);
    
    // when lesson ID is updated, get and save lesson data from server
    useEffect(() => {
        let reqTimeout = setTimeout(async () => {
            try {
                let res = await axiosClient.get(`/api/v1/lessons/${String(id)}`);
                let data = res.data;
                if (data.shuffle) data.tasks = _shuffle(data.tasks);
                if (data.shuffle && data.noToSample > 0) 
                    data.tasks = data.tasks.slice(0, data.noToSample);
                // add lesson end screen
                data.tasks.push({
                    taskID: "end",
                    text: "Congrats! You've finished the lesson!",
                    type: "End",
                    showPercentCorrect: data.showPercentCorrect
                });
                if (data.showInterstitials) {
                    const GAP = 3;
                    let noOfInterstitials = Math.floor(data.tasks.length / GAP) - 1;
                    for (let i = 0; i < noOfInterstitials; i++) {
                        data.tasks.splice((i + 1) * GAP, 0, {
                            taskID: `interstitial-${i}`,
                            text: "",
                            type: "Interstitial",
                        })
                    }
                }
                // save modified lesson data to component state
                setLesson(data);
                setReady(true);
            } catch (err) {
                setReady(true);
                console.log("Get lesson error: ", err);
            }
        }, 200);

        return () => { clearTimeout(reqTimeout) }
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
     * @returns {Number} - calculated percentage
     */
    let getPercentCorrect = () => {
        let total = answerTracking.noCorrect + answerTracking.noWrong;
        return Math.floor((answerTracking.noCorrect / total) * 100);
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
     * proceed onto the next task in the lesson,
     * if lesson is over redirect to dashboard
     * @name nextTask
     */
    let nextTask = () => {
        let nextIndex = currentTaskIndex + 1;
        if (nextIndex >= lesson.tasks.length) {
            endLesson(lesson.id);
            props.getUserData();
            navigate("/dashboard");
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
        let adjustedXP = Math.floor(25 * getPercentCorrect() / 100);
        let endpoint = `/api/v1/users/progress/${lessonID}`;
        axiosClient.put(endpoint, qs.stringify({ XP: adjustedXP }))
            .then(res => {
                props.setProgress(res.data.newProgress);
            })
            .catch(err => { console.log(err); })
    }
    
    if (!ready) return(
        <div className="w-full h-full relative flex items-center 
            justify-center animate-fade-in"
        >
            <ProgressBar percent={0} />
        </div>
    );
    return(
        lesson ? (
            <div className="w-full h-full relative flex 
                items-center justify-center"
            >
                <ProgressBar percent={currentTaskIndex / lesson.tasks.length * 100} />
                <TaskManager
                    taskData={ lesson.tasks[currentTaskIndex] }
                    submitAnswer={ submitAnswer }
                    stats={ `${getPercentCorrect()}%` }
                />
            </div>
        ) : 
        <div className="flex justify-center items-center w-full h-full">
            Loading failed. Please refresh and try again!
        </div>
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