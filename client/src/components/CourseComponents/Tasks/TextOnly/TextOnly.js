import React, { useEffect, useState } from "react";

import testImg from "../../../../res/icons/fella.png";
import NextButton from "../NextButton";
import AudioClip from "../../AudioClip";

function TextOnly(props) {
    let [showSide, setShowSide] = useState(false);

    /** moves to next task
     *  @name submitContinue
     */
    let submitContinue = () => {
        setTimeout(() => {
            props.submit(true);
        }, 200);
    }

    useEffect(() => {
        if (props.data.audioLink || props.data.image) setShowSide(true);
    }, [props.data])

    return(
        <>
            <div 
                data-testid="text-only"
                className="text-only flex flex-row md:flex-row h-5/6 justify-between"
            >
                { showSide && <TextOnlySide data={props.data} /> }
                <div 
                    id="text-only-content" 
                    className="w-8/12 flex flex-col justify-center m-auto"
                >
                    { props.data.text } 
                </div>
            </div>
            <NextButton next={submitContinue} />
        </>
    );
}

const SIDE_STYLES = "w-3/12 flex items-center justify-center";

function TextOnlySide(props) {
    // audio takes priority
    if (props.data.audioLink) return(
        <div className={SIDE_STYLES}>
            <AudioClip 
                src={props.data.audioLink} 
                transcript={props.data.audioTranscript} 
            />
        </div>
    )
    if (props.data.image) return(
        <div className={SIDE_STYLES}>
            <img src={testImg} className="mb-14" alt={props.data.imgAlt} />
        </div>
    )
    return null;
}

export default TextOnly;