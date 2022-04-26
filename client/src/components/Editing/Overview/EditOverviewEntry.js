import React, {  } from "react";
import { useNavigate } from "react-router-dom";

function EditOverviewEntry(props) {
    let navigate = useNavigate();

    return(
        <div 
            className="edit-overview relative"
            id={`entry-${props.lesson.id}`}
        >
            <div className={`
                relative top-0 left-0 w-8 h-16 
                flex flex-col items-center justify-center text-gray-400
                text-xs
                ${props.new ? "hidden" : ""}
            `}>
                <div
                    className={`${props.listEndsState === "first" ? "hidden" : "no"}`} 
                    onClick={() => { props.shiftLesson(props.lesson.id, "up"); }}
                >
                    ▲
                </div>
                {props.index}
                <div
                    className={`${props.listEndsState === "last" ? "hidden" : "no"}`} 
                    onClick={() => { props.shiftLesson(props.lesson.id, "down"); }}
                >
                    ▼
                </div>
            </div>
            { props.new ? "" : props.lesson.name }
            <div 
                className="edit-button cursor-pointer" 
                onClick={() => { navigate(`/edit/${props.lesson.id}`); }}
            >
                {props.new ? "Add New Lesson" : "Edit"}
            </div>
        </div>
    )
}

export default EditOverviewEntry;