import React from "react";
import { connect } from "react-redux";

import Leaderboard from "./SidebarComponents/Leaderboard";

function Sidebar(props) {
    return(
        <aside 
            className="sidebar bg-white dark-primary relative" 
            style={{height: props.lessonWrapHeight}}
        >
            <Leaderboard />
        </aside>
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