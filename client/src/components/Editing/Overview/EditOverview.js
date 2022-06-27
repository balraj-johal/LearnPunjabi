import React, { useCallback, useEffect, useState } from "react";
import axiosClient from "../../../axiosDefaults";

import { _moveArrayIndex, _getListEndsState } from "../../../utils/arrays";

import EditOverviewEntry from "./EditOverviewEntry";
import Loader from "../../Loader";
import ConfirmationPrompt from "../ConfirmationPrompt";

// TODO: decide where best to store this
const NEW_LESSON = {
    name: "",
    id: "new",
    requiredCompletions: 1,
    shuffle: false,
    showInterstitials: true,
    showPercentCorrect: true,
    noToSample: 0,
    tasks: []
}

function EditOverview(props) {
    let [ready, setReady] = useState(false);
    let [courseData, setCourseData] = useState([]);
    let [lessonOrderChanged, setLessonOrderChanged] = useState(false);

    useEffect(() => { 
        document.title = `Learn Punjabi - Edit Lessons`;
    }, []);

    let fetchOverview = () => {
        axiosClient.get("/api/v1/lessons/")
            .then(res => {
                setCourseData(res.data.overview); 
                setReady(true);
            })
            .catch(error => {
                console.log(error); 
                setReady(true);
            })
    }

    // TODO: change this to only request specific properties from the API Get Request
    // on mount retrieve all lessons
    useEffect(() => {
        fetchOverview();
    }, []);
    
    /** Moves specified lesson back or forwards in course order
     * @name shiftLesson
     * @param {String} lessonID
     * @param {String} direction
    */
    let shiftLesson = (lessonID, direction) => {
        let oldIndex = courseData.findIndex(elem => elem.id === lessonID);
        let valid = false;
        switch (direction) {
            case "up":
                if (oldIndex > 0) {
                    _moveArrayIndex(courseData, oldIndex, oldIndex - 1);
                    valid = true;
                }
                break;
            case "down":
                if (oldIndex < courseData.length) {
                    _moveArrayIndex(courseData, oldIndex, oldIndex + 1);
                    valid = true;
                }
                break;
            default:
                break;
        }
        if (valid) {
            setCourseData([...courseData]);
            setLessonOrderChanged(true);
        }
    }
    

    let [showConfirmation, setShowConfirmation] = useState(false);
    let [targetID, setTargetID] = useState(null)
    let [deleting, setDeleting] = useState(false);
    let [deletionSuccess, setDeletionSuccess] = useState(false);
    let deleteLesson = useCallback(async (id) => {
        try {
            setDeleting(true);
            await axiosClient.delete(`/api/v1/lessons/${id}`);
            setDeleting(false);
            setDeletionSuccess(true);
            setShowConfirmation(false);
            fetchOverview();
            // setShowSuccessModal(true);
        } catch (error) {
            setDeleting(false);
            setShowConfirmation(false);
            fetchOverview();
            console.log('error deleting lesson', error);
        }
    }, []);

    if (!ready) return <Loader />;
    return(
        <>
            {showConfirmation && <ConfirmationPrompt
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
                deletionSuccess={setDeletionSuccess}
                deleting={deleting}
                handleYes={() => { deleteLesson(targetID) }}
            />}
            <main className="edit-wrap h-full flex flex-col 
                items-center justify-center"
            >
                <h1 className="visually-hidden">Edit Lessons</h1>
                {courseData.map((lesson, index) => 
                    <EditOverviewEntry
                        lesson={lesson}
                        key={index}
                        index={index}
                        _getListEndsState={_getListEndsState}
                        listEndsState={_getListEndsState(index, courseData)}
                        shiftLesson={shiftLesson}
                        setShowConfirmation={setShowConfirmation}
                        setTargetID={setTargetID}
                    />
                )}
                <EditOverviewEntry lesson={NEW_LESSON} new={true} />
            </main>
        </>
    )
}

export default EditOverview;