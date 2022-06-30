import React, {  } from "react";

import AudioClip from "../AudioClip";

function TaskHeader(props) {
    return(
        <div className="title w-full h-1/6 md:h-2/6 px-0
            flex flex-row justify-start items-center"
        >
            <AudioClip 
                src={props.data.audioLink} 
                transcript={props.data.audioTranscript} 
            />
            <span className={`pr-[30%] lg:text-xl
                ${props.data.audioLink ? "ml-4 md:ml-10" : ""}`}
            >
                { props.data.text }
            </span>
        </div>
    );
}

export default TaskHeader;