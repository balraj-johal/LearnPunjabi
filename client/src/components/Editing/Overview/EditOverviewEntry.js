import React, {  } from "react";
import { useNavigate } from "react-router-dom";

import AddButton from "../../FormComponents/AddButton";

function EditOverviewEntry(props) {
    let navigate = useNavigate();

    if (props.new) return (
        <AddButton 
            extraStyles="mx-auto" 
            addNew={() => { navigate(`/edit/${props.lesson.id}`); }} 
        />
    )
    return(
        <div 
            className="flex justify-between items-center relative 
                rounded border-2 border-black my-4 h-24"
            id={`entry-${props.lesson.id}`}
        >
            <div className="flex flex-row items-center">
                <div className={`
                    relative top-0 left-2 w-8 h-16 
                    flex flex-col items-center justify-center 
                    text-xs text-gray-400 mr-8
                `}>
                    <button
                        className={`${props.listEndsState === "first" ? "invisible" : ""}`} 
                        onClick={() => { props.shiftLesson(props.lesson.id, "up"); }}
                    >
                        ▲
                    </button>
                    {props.index}
                    <button
                        className={`${props.listEndsState === "last" ? "invisible" : ""}`} 
                        onClick={() => { props.shiftLesson(props.lesson.id, "down"); }}
                    >
                        ▼
                    </button>
                </div>
                { props.lesson.name }
                <span className="ml-1 mt-1 text-gray-400 text-sm">
                    {props.lesson.tasksLength > 1 ? `${props.lesson.tasksLength} tasks` : "1 task"}
                </span>
            </div>
            <button 
                className="w-24 h-10 mx-5 flex items-center 
                    justify-center cursor-pointer transition-all
                    text-primary rounded border-2 border-black
                    hover:bg-primary hover:text-white hover:border-primary" 
                onClick={() => { navigate(`/edit/${props.lesson.id}`); }}
            >
                Edit
            </button>
    </div>
    )
}

export default EditOverviewEntry;