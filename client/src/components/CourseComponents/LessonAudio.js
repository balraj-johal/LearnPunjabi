import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { playAudio } from "../../actions/lessonStatusActions";

import correctAudio from "../../res/sounds/success.mp3";
import wrongAudio from "../../res/sounds/fail.mp3";

function LessonAudio(props) {
    let correctRef = useRef();
    let endRef = useRef();
    let wrongRef = useRef();
    
    useEffect(() => {
        correctRef.current.volume = 0.25;
        wrongRef.current.volume = 0.25;
        endRef.current.volume = 0.25;
        switch (props.playingAudio) {
            case "correct":
                correctRef.current.play();
                break;
            case "wrong":
                wrongRef.current.play();
                break;
            case "end":
                endRef.current.play();
                break;
            default:
                break;
        }
    }, [props.playingAudio])

    return(
        <div className="lesson-status-audio visually-hidden">
            <audio 
                ref={correctRef} 
                src={correctAudio} 
                preload="auto"
                role="audio" 
                onEnded={() => {
                    props.playAudio(null);
                }}
            />
            <audio 
                ref={endRef} 
                src={correctAudio} 
                preload="auto"
                role="audio" 
                onEnded={() => {
                    props.playAudio(null);
                }}
            />
            <audio 
                ref={wrongRef} 
                src={wrongAudio} 
                preload="auto"
                role="audio" 
                onEnded={() => {
                    props.playAudio(null);
                }}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    playingAudio: state.lessonStatus.playingAudio
});

export default connect(
    mapStateToProps,
    {
        playAudio
    }
)(LessonAudio);