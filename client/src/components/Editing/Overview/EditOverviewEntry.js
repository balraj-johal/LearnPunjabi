import React, {  } from "react";
import { useNavigate } from "react-router-dom";

function EditOverviewEntry(props) {
    let navigate = useNavigate();

    return(
        <div 
            className="flex justify-between items-center relative w-full
                rounded border-2 border-black my-4 h-24 bg-white shadow-md"
            id={`entry-${props.lesson.id}`}
        >
            <div className="flex flex-row items-center pl-4">
                { props.lesson.name }
                <span className="ml-1 mt-1 text-gray-400 text-sm">
                    {props.lesson.tasksLength > 1 ? 
                        `${props.lesson.tasksLength} tasks` : "1 task"}
                </span>
            </div>
            <div id="position">
                <div
                    className={`${props.lesson.position === "left" ? "" : "text-gray-200"}`} 
                    onClick={() => { 
                        props.updateLessonPosition(props.lesson.id, "left") 
                    }}
                >
                    left
                </div>
                <div
                    className={`${props.lesson.position === "middle" ? "" : "text-gray-200"}`} 
                    onClick={() => { 
                        props.updateLessonPosition(props.lesson.id, "middle") 
                    }}
                >
                    middle
                </div>
                <div
                    className={`${props.lesson.position === "right" ? "" : "text-gray-200"}`} 
                    onClick={() => { 
                        props.updateLessonPosition(props.lesson.id, "right") 
                    }}
                >
                    right
                </div>
            </div>
            <div id="buttons">
                <button 
                    className="w-24 h-10 mx-5 flex items-center 
                        justify-center cursor-pointer transition-all
                        rounded border-2 border-black
                        hover:bg-red-500 hover:text-white 
                        hover:border-red-500 text-red-500" 
                    onClick={() => { 
                        props.setShowConfirmation(true); 
                        props.setTargetID(props.lesson.id);
                    }}
                >
                    Delete
                </button>
                <button 
                    className="w-24 h-10 mx-5 flex items-center 
                        justify-center cursor-pointer transition-all
                        text-primary rounded border-2 border-black
                        hover:bg-primary hover:text-white 
                        hover:border-primary" 
                    onClick={() => { navigate(`/edit/${props.lesson.id}`) }}
                >
                    Edit
                </button>
            </div>
        </div>
    )
}

export default EditOverviewEntry;