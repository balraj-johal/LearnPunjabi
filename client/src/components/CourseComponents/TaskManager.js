import React, {  } from "react";
import { connect } from "react-redux";

import MultipleChoice from "./Tasks/MultipleChoice";

function TaskManager(props) {

    switch (props.taskData.type) {
        case "MultipleChoice":
            return(
                <MultipleChoice 
                    taskData={props.taskData} 
                    submitAnswer={props.submitAnswer}
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