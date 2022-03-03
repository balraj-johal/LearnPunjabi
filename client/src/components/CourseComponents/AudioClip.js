import React from "react";

function AudioClip(props) {
    return(
        <div className="audio">
            <audio 
                id={`audio-${props.src}`} 
                src={ `https://d2hks59q0iv04y.cloudfront.net/${props.src}` }
                autoPlay={true}
                controls={true}
            />
            <div className="replay-audio-button button" onClick={() => {
                let audElem = document.getElementById(`audio-${props.src}`);
                audElem.currentTime = 0;
                audElem.play();
            }}>replay</div>
        </div>
    )
}

export default AudioClip;