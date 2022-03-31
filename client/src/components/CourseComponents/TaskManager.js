import React from "react";
import { connect } from "react-redux";

import MultipleChoice from "./Tasks/MultipleChoice";
import TextOnly from "./Tasks/TextOnly";
import End from "./Tasks/End";
import SpecifiedOrder from "./Tasks/SpecifiedOrder";
import DrawLetter from "./Tasks/DrawLetter";

function TaskManager(props) {
    // return task component of specified type
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
        // case "SpecifiedOrder":
        //     return(
        //         <SpecifiedOrder 
        //             data={props.taskData} 
        //             submit={props.submitAnswer}
        //             stats={props.stats}
        //         />
        //     );
        // case "DrawLetter":
        case "SpecifiedOrder":
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
                <div className="task">
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

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {}
)(TaskManager);