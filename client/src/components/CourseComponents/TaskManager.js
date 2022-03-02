import React, {  } from "react";
import { connect } from "react-redux";

import MultipleChoice from "./Tasks/MultipleChoice";
import TextOnly from "./Tasks/TextOnly";
import End from "./Tasks/End";
import SpecifiedOrder from "./Tasks/SpecifiedOrder";

function TaskManager(props) {

    switch (props.taskData.type) {
        case "MultipleChoice":
            return(
                <MultipleChoice 
                    data={props.taskData} 
                    submitAnswer={props.submitAnswer}
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
        case "TextOnly":
            return(
                <TextOnly 
                    data={props.taskData} 
                    submit={props.submitAnswer}
                    stats={props.stats}
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
    {
    }
)(TaskManager);