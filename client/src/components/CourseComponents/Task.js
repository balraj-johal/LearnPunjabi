import React, { useState, useEffect } from "react";
import qs from "qs";
import { connect } from "react-redux";
// router imports
import { 
    useParams
} from "react-router-dom";

import axios from "axios";

function Task(props) {
    return(
        <div className="task">
            {props.task.text}
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
    }
)(Task);