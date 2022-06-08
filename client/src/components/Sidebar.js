import React from "react";
import { connect } from "react-redux";

import Leaderboard from "./SidebarComponents/Leaderboard";

function Sidebar(props) {
    return(
        <div 
            className="sidebar bg-white dark-primary relative" 
            style={{height: props.lessonWrapHeight}}
        >
            <Leaderboard />
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    lessonWrapHeight: state.display.lessonWrapHeight
});

export default connect(
    mapStateToProps,
    {}
)(Sidebar);