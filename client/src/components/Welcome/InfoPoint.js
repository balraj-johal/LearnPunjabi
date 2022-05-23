import React, { useRef } from "react";
import { useInViewport } from 'react-in-viewport';

function InfoPoint(props) {
    const ref = useRef();
    const { inViewport } = useInViewport( ref );

    return(
        <div 
            id={`thing-${props.index}`} 
            className={`thing ${inViewport ? "fadeIn" : ""} animDelay500`} 
            ref={ref} 
        >
            <div className="title">{props.title}</div>
            <div className="text">{props.text}</div>
        </div> 
    )
}

export default InfoPoint;