import React, {  } from "react";
import { useNavigate } from "react-router-dom";

import AddButton from "../../FormComponents/AddButton";

function EditOverviewEntry(props) {
    let navigate = useNavigate();

    if (props.new) return(
        <AddButton 
            extraStyles="mx-auto" 
            addNew={() => { navigate(`/edit/${props.lesson.id}`); }} 
        />
    )
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