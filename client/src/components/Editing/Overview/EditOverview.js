import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    DndContext, 
    KeyboardSensor, 
    MouseSensor, 
    TouchSensor, 
    useSensor, 
    useSensors,
    closestCenter,
} from "@dnd-kit/core";
import { 
    SortableContext, 
    verticalListSortingStrategy, 
    sortableKeyboardCoordinates, 
    arrayMove, 
} from '@dnd-kit/sortable';

import axiosClient from "../../../axiosDefaults";
import qs from "qs";

import EditOverviewEntry from "./EditOverviewEntry";
import AddButton from "../../FormComponents/AddButton";
import Loader from "../../Loader";
import ConfirmationPrompt from "../ConfirmationPrompt";
import GenericButton from "../../GenericButton";
import PopInModal from "../PopInModal";
import SortableItem from "../../SortableItem";

function EditOverview(props) {
    let navigate = useNavigate();

    let [ready, setReady] = useState(false);
    let [courseData, setCourseData] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [modalText, setModalText] = useState("");

    let [showConfirmation, setShowConfirmation] = useState(false);
    let [targetID, setTargetID] = useState(null);
    let [deleting, setDeleting] = useState(false);

    useEffect(() => { 
        document.title = `Learn Punjabi - Edit Lessons`;
        fetchOverview();
    }, []);

    /** gets all lessons, allowing ordering of course layout
     * @name fetchOverview
     */
    let fetchOverview = () => {
        // TODO: only pop new lessons out of order?
        // axiosClient.get("/api/v1/courses/")
        //     .then(res => {
        //         setCourseData(res.data.lessons); 
        //         setReady(true);
        //     })
        //     .catch(error => {
        //         console.log(error); 
        //         setReady(true);
        //     })
        axiosClient.get("/api/v1/lessons/")
            .then(res => {
                const data = res.data.overview;
                // default lesson icon position to middle
                data.forEach(lesson => {
                    lesson.position = "middle";
                })
                setCourseData(data); 
                setReady(true);
            })
            .catch(error => {
                console.log(error); 
                setReady(true);
            })
    }

    /** saves course data as new version
     * @name handleOrderSave
     */
    let handleOrderSave = () => {
        const payload = qs.stringify({ courseData: courseData });
        axiosClient.post("/api/v1/courses/", payload)
            .then(res => { 
                setShowModal(true);
                setModalText(
                    `Version ${res.data.savedCourse.version} saved!`
                );
            })
            .catch(error => { console.error(error) })
    }

    /** updates lesson position in columns on dashboard
     * @param  {String} id lessonid
     * @param  {String} newPosition "left", "middle", "right"
     */
    let updateLessonPosition = (id, newPosition) => {
        let newData = [...courseData];
        newData.forEach(lesson => {
            if (lesson.id === id) lesson.position = newPosition;
        })
        setCourseData(newData);
    }

    /**
     * deletes specified lesson
     * @name deleteLesson
     * @param {String} id - lesson id
     */
    let deleteLesson = useCallback(async (id) => {
        try {
            setDeleting(true);
            await axiosClient.delete(`/api/v1/lessons/${id}`);
            setDeleting(false);
            setModalText("Deletion successful!");
            setShowModal(true);
            setShowConfirmation(false);
            fetchOverview();
        } catch (error) {
            setDeleting(false);
            setShowConfirmation(false);
            fetchOverview();
            setModalText("Deletion failed...");
            setShowModal(true);
            console.log('error deleting lesson', error);
        }
    }, []);
    
    // define interaction sensors for drag/drop behaviour
    const sensors = useSensors(
        useSensor(MouseSensor, 
            { activationConstraint: { distance: 10 } }
        ),
        useSensor(TouchSensor, 
            { activationConstraint: { delay: 250, tolerance: 5} }
        ),
        useSensor(KeyboardSensor, 
            { coordinateGetter: sortableKeyboardCoordinates }
        ),
    )
    
    /**
     * reorders course data on end of drag and drop interaction
     * @param {Object} event drag event
     */
    let handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            // update data order
            setCourseData((lessons) => {
                try {
                    let oldIndex, newIndex;
                    lessons.forEach((lesson, index) => {
                        if (!oldIndex) {
                            if (active.id === lesson.id) oldIndex = index;
                        }
                        if (!newIndex) {
                            if (over.id === lesson.id) newIndex = index;
                        }
                    });
                    // if (!oldIndex || !newIndex) { throw("indexes not found") }
                    return arrayMove(lessons, oldIndex, newIndex);
                } catch (error) {
                    console.log(error);
                }
            })
        }
    }

    if (!ready) return <Loader />;
    return(
        <>
            <PopInModal 
                text={modalText}
                show={showModal} 
                length={8000} 
                unrender={() => { 
                    setShowModal(false); 
                }}
            /> 
            {showConfirmation && <ConfirmationPrompt
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
                deleting={deleting}
                handleYes={() => { deleteLesson(targetID) }}
            />}
            <main className="edit-wrap h-full flex flex-col 
                items-center"
            >
                <div className="w-full flex justify-between items-center my-10">
                    <h1 className="text-xl">Edit Course</h1>
                    <GenericButton 
                        text="Save Course" 
                        handleClick={handleOrderSave}
                    />
                </div>
                <DndContext 
                    onDragEnd={handleDragEnd} 
                    sensors={sensors} 
                    collisionDetection={closestCenter} 
                >
                    <SortableContext 
                        items={courseData} 
                        strategy={verticalListSortingStrategy}
                    >
                        {courseData.map((lesson, index) => 
                            <SortableItem 
                                key={lesson.id} 
                                id={lesson.id} 
                                extraStyles="w-full" 
                            >
                                <EditOverviewEntry
                                    lesson={lesson}
                                    index={index}
                                    updateLessonPosition={updateLessonPosition}
                                    setShowConfirmation={setShowConfirmation}
                                    setTargetID={setTargetID}
                                />
                            </SortableItem>
                        )}
                    </SortableContext>
                </DndContext>
                <AddButton 
                    extraStyles="mx-auto" 
                    addNew={() => { navigate(`/edit/new`); }} 
                />
            </main>
        </>
    )
}

export default EditOverview;