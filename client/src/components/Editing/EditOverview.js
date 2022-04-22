import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosDefaults";

import { _moveArrayIndex, _getListEndsState } from "../../utils/arrays";

import EditOverviewEntry from "./EditOverviewEntry";
import Loader from "../Loader";


// TODO: this seems wrong
const NEW_LESSON = {
    name: "",
    id: "new",
    requiredCompletions: 1,
    shuffle: false,
    tasks: []
}

function EditOverview(props) {
    let [courseData, setCourseData] = useState([]);
    let [lessonOrderChanged, setLessonOrderChanged] = useState(false);

    // on mount retrieve all lessons
    // TODO: change this to only request specific properties from the API Get Request
    useEffect(() => {
        axiosClient.get("/api/v1/lessons/")
            .then(res => { setCourseData(res.data.overview); })
            .catch(err => { console.log(err); })
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
                console.log("UP")
                if (oldIndex > 0) {
                    _moveArrayIndex(courseData, oldIndex, oldIndex - 1);
                    valid = true;
                }
                break;
            case "down":
                console.log("DONW")
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

    let saveUpdatedCourseData = () => {
        console.log("saving: ", courseData);
    }

    if (courseData.length === 0) return <Loader />;
    return(
        <div className="edit-wrap">
            {courseData.map((lesson, index) => 
                <EditOverviewEntry
                    lesson={lesson}
                    key={index}
                    _getListEndsState={_getListEndsState}
                    listEndsState={_getListEndsState(index, courseData)}
                    shiftLesson={shiftLesson}
                />
            )}
            <EditOverviewEntry lesson={NEW_LESSON} new={true} />
            <SaveButton save={saveUpdatedCourseData} show={lessonOrderChanged} />
        </div>
    )
}

// TODO: atomise
function SaveButton(props) {
    return(
        <div 
            className={`capitalize h-10 bg-blue-500 rounded w-4/12 float-right mt-12
                text-white px-4 cursor-pointer flex justify-center items-center
                ${props.show ? "" : "hidden"}`}
            onClick={() => { props.save(); }}
        >
            Save Order
        </div>
    )
}

export default EditOverview;