import React, { useEffect, useRef } from "react";

import AudioIcon from "../../res/icons/audio.png";

function AudioClip(props) {
    let ref = useRef();

    // attempt to manually autoplay
    useEffect(() => {
        if (!props.src) return;
        // Ref was not used here as was returning null when mounted
        let audioElem = document.getElementById(`audio-${props.src}`);
        let handler = () => {
            if (audioElem.readState >= 2) audioElem.play();
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
            />
            <div 
                className="replay-audio-button button 
                    active:bg-primary2 transition-all" 
                onClick={() => {
                    ref.current.currentTime = 0;
                    ref.current.play();
                }}
            >
                <img src={AudioIcon} alt="play-audio-button-icon" />
            </div>
        </div>
    )
}

export default AudioClip;