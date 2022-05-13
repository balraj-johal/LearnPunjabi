import React, {  } from "react";

import { useNavigate } from "react-router-dom";


function LessonIcon(props) {
    let navigate = useNavigate();
    return(
        <div 
            className={`lesson z-20 relative overflow-hidden no-highlight
                ${props.status ? "" : "incomplete"} bg-white`}
            onClick={() => { navigate(`/lesson/${props.lesson.id}`) }}
        >
            <span className="z-10">{ props.lesson.name }<br/></span>
            {/* <p>{ props.timesCompleted }/{ props.lesson.requiredCompletions }</p> */}
            <div 
                className="bg-primary z-0 w-full absolute bottom-0" 
                style={{height: `${props.timesCompleted * 100/ props.lesson.requiredCompletions}%`}} 
            ></div>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    userProgress: state.auth.user.progress,
});

export default LessonIcon;