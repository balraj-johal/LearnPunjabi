import React, {  } from "react";

function AddButton(props) {
    let size = props.size || 28;
    let styles = props.extraStyles || "";

    return(
        <div
            className={`flex flex-col justify-evenly items-center
                rounded border-2 border-slate-200 p-4 m-3
                group hover:bg-blue-400 hover:text-white 
                hover:border-blue-400 transition-all
                w-${size} h-${size} ${styles}`}
            onClick={() => { props.addNew(); }}
        >
            {props.text ? props.text : null}
            <div className="text-3xl text-blue-400
                group-hover:text-white transition-all"
            >+</div>
        </div>
    )
}

export default AddButton;