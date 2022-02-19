import React, {  } from "react";
import { connect } from "react-redux";

import MultipleChoice from "./Tasks/MultipleChoice";
import End from "./End";

function TaskManager(props) {

    switch (props.taskData.type) {
        case "MultipleChoice":
            return(
                <MultipleChoice 
                    taskData={props.taskData} 
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