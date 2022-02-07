import React, { useState } from "react";

import { connect } from "react-redux";

function Lesson(props) {
    
    let lessonData = [{}] // TODO; describe this object

    return(
        <div>
            {lessonData.map(lesson => {
                // TODO: render lesson here
            })}
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
)(Lesson);