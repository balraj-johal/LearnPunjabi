import React, { useEffect, useState } from "react";
import axiosClient from "../../../axiosDefaults";

import { _moveArrayIndex, _getListEndsState } from "../../../utils/arrays";

import EditOverviewEntry from "./EditOverviewEntry";
import Loader from "../../Loader";
import SaveButton from "../SaveButton";

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

    // TODO: change this to only request specific properties from the API Get Request
    // on mount retrieve all lessons
    useEffect(() => {
        axiosClient.get("/api/v1/lessons/")
            .then(res => {
                setCourseData(res.data.overview); 
                setReady(true);
            })
            .catch(error => {
                console.log(error); 
                setReady(true);
            })
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

    // let saveUpdatedCourseData = () => {
    //     console.log("saving: ", courseData);
    // }

    if (!ready) return <Loader />;
    return(
        <div className="edit-wrap">
            {courseData.map((lesson, index) => 
                <EditOverviewEntry
                    lesson={lesson}
                    key={index}
                    index={index}
                    _getListEndsState={_getListEndsState}
                    listEndsState={_getListEndsState(index, courseData)}
                    shiftLesson={shiftLesson}
                />
            )}
            <EditOverviewEntry lesson={NEW_LESSON} new={true} />
            {/* <SaveButton save={saveUpdatedCourseData} show={lessonOrderChanged} /> */}
        </div>
    )
}

export default EditOverview;