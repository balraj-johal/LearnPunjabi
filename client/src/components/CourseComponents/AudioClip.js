import React, { useEffect } from "react";

import AudioIcon from "../../res/icons/audio.png";

function AudioClip(props) {
    // attempt to play on load for mobile
    useEffect(() => {
        let audio = document.getElementById(`audio-${props.src}`)
        let handler = () => {
            if (audio.readState >= 2) {
                audio.play();
            }
        }
        audio.addEventListener("loadeddata", handler);

        return () => {
            audio.removeEventListener("loadeddata", handler);
        }
    }, [props.src])

    return(
        <div className="audio no-highlight">
            <audio 
                id={`audio-${props.src}`} 
                src={ `https://d2hks59q0iv04y.cloudfront.net/${props.src}` }
                preload="auto"
                autoPlay={true}
            />
            <div className="replay-audio-button button active:bg-primary2 transition-all" 
                onClick={() => {
                    let audElem = document.getElementById(`audio-${props.src}`);
                    audElem.currentTime = 0;
                    audElem.play();
                }}
            >
                <img src={AudioIcon} alt="play-audio-button-icon"></img>
            </div>
        </div>
    )
}

export default AudioClip;