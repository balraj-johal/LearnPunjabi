import React from "react";

import MultipleChoice from "./Tasks/MultipleChoice/MultipleChoice";
import TextOnly from "./Tasks/TextOnly/TextOnly";
import End from "./Tasks/End";
import SpecifiedOrder from "./Tasks/SpecifiedOrder/SpecifiedOrder";
import DrawLetter from "./Tasks/DrawLetter/DrawLetter";

// return task component of specified type
function TaskManager(props) {
    switch (props.taskData.type) {
        case "TextOnly":
            return(
                <TextOnly 
                    data={props.taskData} 
                    submit={props.submitAnswer}
                    stats={props.stats}
                />
            );
        case "MultipleChoice":
            return(
                <MultipleChoice 
                    data={props.taskData} 
                    submitAnswer={props.submitAnswer}
                />
            );
        case "SpecifiedOrder":
            return(
                <SpecifiedOrder 
                    data={props.taskData} 
                    submit={props.submitAnswer}
                    stats={props.stats}
                />
            );
        case "DrawLetter":
            return(
                <DrawLetter 
                    data={props.taskData} 
                    submit={props.submitAnswer}
                    stats={props.stats}
                />
            );
        case "End":
            return(
                <End 
                    data={props.taskData} 
                    submit={props.submitAnswer}
                    stats={props.stats}
                />
            );
        default:
            return(
                <div className="task animate-fade-in">
                    {props.taskData.text}
                    Other
                    <div onClick={()=>{
                        props.submitAnswer(true);
                    }}>
                        Next &gt;
                    </div>
                </div>
            );
    }
}

export default TaskManager;