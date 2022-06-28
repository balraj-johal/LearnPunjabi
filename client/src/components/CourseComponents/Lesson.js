import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import qs from "qs";
import axiosClient from "../../axiosDefaults";
import { _shuffle } from "../../utils/arrays";

//import redux actions
import { setProgress } from "../../actions/courseActions";
import { getUserData } from "../../actions/authActions";

// import components
import TaskManager from "./Tasks/TaskManager";
import ProgressBar from "./ProgressBar";
import LessonAudio from "./LessonAudio";

function Lesson(props) {
    let navigate = useNavigate();
    let { id } = useParams();

    // initialise states
    let [lesson, setLesson] = useState();
    let [ready, setReady] = useState(false);
    let [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    let [answerTracking, setAnswerTracking] = useState({ 
        noCorrect: 0, 
        noWrong: 0, 
    });
    let [mistakeTracker, setMistakeTracker] = useState([]);
    let [noOfTasks, setNoOfTasks] = useState(0);

    useEffect(() => { 
        document.title = `Learn Punjabi - ${String(id)}`
    }, []);
    
    // when lesson ID is updated, get and save lesson data from server
    useEffect(() => {
        let reqTimeout;
        if (props.lessonOverride) {
            setLesson(props.lessonOverride);
            setReady(true);
        } else {
            reqTimeout = setTimeout(async () => {
                try {
                    let res = 
                        await axiosClient.get(`/api/v1/lessons/${String(id)}`);
                    let data = res.data;
                    // prepare tasks
                    if (data.shuffle) data.tasks = _shuffle(data.tasks);
                    if (data.shuffle && data.noToSample > 0) 
                        data.tasks = data.tasks.slice(0, data.noToSample);
                    setNoOfTasks(data.tasks.length);
                    // add lesson end screen
                    data.tasks.push({
                        taskID: "end",
                        text: "Congrats! You've finished the lesson!",
                        type: "End",
                        showPercentCorrect: data.showPercentCorrect
                    });
                    // add interstitials
                    if (data.showInterstitials) {
                        const GAP = 3;
                        let noOfInterstitials = 
                            Math.floor(data.tasks.length / GAP) - 1;
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
        }

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
     * @name submit
     * @param  {Boolean} correct - was user's answer correct
     * @param  {String} taskType
     */
    const typesToIgnore = ["End", "Interstitial"]
    let submit = (correct, taskType) => {
        // check task type here
        if (typesToIgnore.includes(taskType)) return nextTask();
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
            if (props.lessonOverride) return;
            endLesson(lesson.id);
            props.getUserData(); // WHY AM I DOING THIS HERE?
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
        if (props.lessonOverride) return;
        // TODO: submit tracked mistakes here
        // let mistakes = answerTracking.wrongTasks;
        let adjustedXP = Math.floor(5 * getPercentCorrect() / 100) + 5;
        let endpoint = `/api/v1/users/progress/${lessonID}`;
        axiosClient.put(endpoint, qs.stringify({ XP: adjustedXP }))
            .then(res => {
                props.setProgress(res.data.newProgress);
            })
            .catch(err => { console.log(err); })
    }

    /** Caculates progress through lesson
     * @name getProgressPercent
     * @returns {Number} progress as percentage
     */
    let getProgressPercent = () => {
        return answerTracking.noCorrect / noOfTasks * 100;
    }
    
    if (!ready) return null;
    return(
        lesson ? (
            <div className={`w-full h-full relative flex
                ${props.lessonOverride ? "" : "bg-white"} md:bg-transparent z-50 
                items-center justify-center min-h-[550px] md:min-h-[500px]`}
            >
                <LessonAudio />
                <h1 className="visually-hidden">Lesson {lesson.name}</h1>
                {!props.lessonOverride && 
                    <ProgressBar percent={getProgressPercent()} />}
                <TaskManager
                    override={props.lessonOverride ? true : false}
                    taskData={lesson.tasks[currentTaskIndex]}
                    submit={submit}
                    stats={`${getPercentCorrect()}%`}
                />
            </div>
        ) : (
            <div className="flex justify-center items-center w-full h-full">
                Loading failed. Please refresh and try again!
            </div>
        )
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
        setProgress,
        getUserData
    }
)(Lesson);