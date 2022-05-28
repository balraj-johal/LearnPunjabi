import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "react-lottie-player";

import { randNo } from "../../utils/math";
import wave from "../../res/animations/wave.json";

const ANIMATION_OFFSET_CLASS = "mt-[117px]";

function LessonIcon(props) {
    let navigate = useNavigate();
    let [startFrame, setStartFrame] = useState(randNo(0, 30));
    let [waterFillAmount, setWaterFillAmount] = useState(0);
    let [showWave, setShowWave] = useState();
    let [finished, setFinished] = useState(false);

    useEffect(() => {
        setWaterFillAmount(props.timesCompleted * 150 / props.lesson.requiredCompletions)
        waterFillAmount >= 150 ? setShowWave(false) : setShowWave(true);
        setFinished(props.timesCompleted >= props.lesson.requiredCompletions);
    }, [props.timesCompleted])

    return(
        <Link to={`/lesson/${props.lesson.id}`}>
            <div className={`${finished ? "bg-[#FFD700]" : "bg-white"} 
                    lesson z-20 relative overflow-hidden no-highlight`}
            >
                <span className="z-10">
                    { props.lesson.name }<br/>
                </span>
                <div 
                    className={`${finished ? "" : "bg-primary"} 
                        z-0 w-full absolute bottom-0`} 
                    style={{
                        height: `${ waterFillAmount > 150 ? "100" : waterFillAmount }%`
                    }} 
                />
                { showWave && <Lottie 
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} 
                    className={`w-full h-full absolute ${ANIMATION_OFFSET_CLASS}`}
                    style={{ transform: `translate(0, -${waterFillAmount}px)` }}
                    animationData={wave} 
                    goTo={startFrame} 
                    loop 
                    play 
                /> }
            </div>
        </Link>
    )
}

export default LessonIcon;