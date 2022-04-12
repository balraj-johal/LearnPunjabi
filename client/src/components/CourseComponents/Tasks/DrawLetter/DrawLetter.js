import React, { useState } from "react";

import DrawingCanvas from "./DrawingCanvas";

function DrawLetter(props) {
    let [clearing, setClearing] = useState(false);

    let submitAnswer = () => {
        props.submit(true);
    }

    return(
        <div className="task draw-letter">
            { props.data.text }
            <DrawingCanvas clearing={clearing} setClearing={setClearing} />
            <div onClick={()=>{ submitAnswer(); }} >
                Next &gt;
            </div>
            <div
                className="task-button" 
                id="clear-canvas" 
                onClick={()=>{
                    console.log("btn clicked")
                    setClearing(true);
                }}
            >
                Clear &gt;
            </div>
        </div>
    );
}

export default DrawLetter;