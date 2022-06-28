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
    useSortable, 
    sortableKeyboardCoordinates, 
    arrayMove, 
} from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

import axiosClient from "../../../axiosDefaults";
import qs from "qs";
import { _moveArrayIndex, _getListEndsState } from "../../../utils/arrays";

import EditOverviewEntry from "./EditOverviewEntry";
import AddButton from "../../FormComponents/AddButton";
import Loader from "../../Loader";
import ConfirmationPrompt from "../ConfirmationPrompt";
import GenericButton from "../../GenericButton";

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
    let navigate = useNavigate();

    let [ready, setReady] = useState(false);
    let [courseData, setCourseData] = useState([]);
    let [lessonOrderChanged, setLessonOrderChanged] = useState(false);

    useEffect(() => { 
        document.title = `Learn Punjabi - Edit Lessons`;
        fetchOverview();
    }, []);

    let fetchOverview = () => {
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
                setCourseData(res.data.overview); 
                setReady(true);
            })
            .catch(error => {
                console.log(error); 
                setReady(true);
            })
    }

    let [showConfirmation, setShowConfirmation] = useState(false);
    let [targetID, setTargetID] = useState(null);
    let [deleting, setDeleting] = useState(false);
    let [deletionSuccess, setDeletionSuccess] = useState(false);

    let handleOrderSave = () => {
        console.log(courseData)
        const payload = qs.stringify({ courseData: courseData });
        axiosClient.post("/api/v1/courses/", payload)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error); 
            })
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
    
    // define interaction sensors for drag/drop behaviour
    const sensors = useSensors(
        useSensor(MouseSensor, 
            { activationConstraint: {
                distance: 10
            } }
        ),
        useSensor(TouchSensor, 
            { activationConstraint: { delay: 250, tolerance: 5} }
        ),
        useSensor(KeyboardSensor, 
            { coordinateGetter: sortableKeyboardCoordinates }
        ),
    )

    let handleDragEnd = (event) => {
        const { active, over } = event;
        setLessonOrderChanged(true);
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
            {showConfirmation && <ConfirmationPrompt
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
                deletionSuccess={setDeletionSuccess}
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
                            <SortableItem key={lesson.id} id={lesson.id}>
                                <EditOverviewEntry
                                    lesson={lesson}
                                    index={index}
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

function SortableItem({children, ...props}) {
    const { 
        attributes, 
        listeners, 
        setNodeRef, 
        transform, 
        transition 
    } = useSortable({id: props.id});

    const style = { 
        transform: CSS.Transform.toString(transform), transition,
        width: "100%"
    };

    return(
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
            {children}
        </div>
    )
}

export default EditOverview;