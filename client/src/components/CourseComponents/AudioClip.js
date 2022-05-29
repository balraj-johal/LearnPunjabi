import React, { useRef, useState } from "react";

import audioAnim from "../../res/animations/play.json";
import Lottie from "react-lottie-player";

function AudioClip(props) {
    let ref = useRef();
    let [playing, setPlaying] = useState(false);

    if (!props.src) return null;
    return(
        <div className="audio no-highlight">
            <audio 
                id={`audio-${props.src}`} 
                src={props.src}
                preload="auto"
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
            </div>
        </div>
    )
}

export default AudioClip;