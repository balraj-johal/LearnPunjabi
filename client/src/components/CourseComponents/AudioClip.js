import React, { useEffect, useRef, useState } from "react";

import audioIcon from "../../res/icons/audio.png";
import audioAnim from "../../res/animations/play.json";
import Lottie from "react-lottie-player";

function AudioClip(props) {
    let ref = useRef();
    let [startFrame, setStartFrame] = useState(0);
    let [playing, setPlaying] = useState(false);

    // attempt to manually autoplay
    useEffect(() => {
        if (!props.src) return;
        // Ref was not used here as was returning null when mounted
        let audioElem = document.getElementById(`audio-${props.src}`);
        let handler = () => {
            if (!audioElem.readState >= 2) return;
            audioElem.play();
            // setPlaying(true);
        }
        audioElem.addEventListener("loadeddata", handler);

        return () => { 
            if (audioElem) audioElem.removeEventListener("loadeddata", handler);
        }
    }, [props.src])

    if (!props.src) return null;
    return(
        <div className="audio no-highlight">
            <audio 
                id={`audio-${props.src}`} 
                src={props.src}
                preload="auto"
                autoPlay={true}
                ref={ref}
                onEnded={() => { setPlaying(false) }}
            />
            <div 
                className={`replay-audio-button button transition-all
                    ${playing ? "bg-primary2" : "bg-primary"}`}
                onClick={() => {
                    ref.current.currentTime = 0;
                    ref.current.play();
                    setPlaying(true);
                }}
            >
                <Lottie 
                    className="w-full h-full p-3"
                    animationData={audioAnim}
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} 
                    loop
                    play={playing}
                    goTo={0}
                />
                {/* <img src={audioIcon} alt="Play audio" /> */}
            </div>
        </div>
    )
}

export default AudioClip;