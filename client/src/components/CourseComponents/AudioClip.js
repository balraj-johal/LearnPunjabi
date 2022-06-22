import React, { useRef, useState } from "react";

import audioAnim from "../../res/animations/play.json";
import Lottie from "react-lottie-player";

function AudioClip(props) {
    let ref = useRef();
    let [playing, setPlaying] = useState(false);

    /**
     * Allows user to pause playback using the spacebar when focused.
     * @name handleStop
     * @param {Object} e - event
     */
    let handleStop = (e) => {
        // if (!playing) return;
        if (e.keyCode === 32 || e.keyCode === 13) {
            e.preventDefault();
            if (!playing) return playAudio();
            ref.current.pause();
            setPlaying(false);
        }
    }

    let playAudio = () => {
        ref.current.volume = 0.25;
        ref.current.play();
        setPlaying(true);
    }

    if (!props.src) return null;
    return(
        <div className="audio no-highlight">
            <audio
                id={`audio-${props.src}`} 
                src={props.src}
                preload="auto"
                role="audio"
                ref={ref}
                onEnded={() => { setPlaying(false) }}
                aria-labelledby="audio-transcript"
            />
            <p className="visually-hidden" id="audio-transcript">
                {props.transcript}
            </p>
            <button 
                className={`replay-audio-button button transition-all
                    ${playing ? "bg-secondary" : "bg-primary"}`}
                onClick={() => {
                    ref.current.currentTime = 0;
                    playAudio();
                }}
                onKeyDown={handleStop}
            >   
                <span className="visually-hidden">Play Audio</span>
                <Lottie 
                    className="w-full h-full p-3"
                    animationData={audioAnim}
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} 
                    loop
                    play={playing}
                    goTo={0}
                />
            </button>
        </div>
    )
}

export default AudioClip;