import React, { useEffect, useRef, useState } from "react";
import { config, useSpring } from "react-spring";

function NextButton(props) {
    let button = useRef();
    let [disabled, setDisabled] = useState(false);
    let [pulsing, setPulsing] = useState(false);

    let handleClick = () => {
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
        }, 600);
    }

    const max = 400;
    const min = 100;
    const pulse = useSpring({
        from: { spread: min },
        to: { spread: pulsing ? max : min },
        onRest: () => { setPulsing(false) },
        onChange: () => {
            button.current.style.setProperty(
                "--size", 
                `${pulse.spread.get()}px`
            );
            button.current.style.setProperty(
                "--spread", 
                `${pulse.spread.get()}px`
            );
        },
        config: {
            mass: 1, tension: 400, friction: 18, clamp: true
        }
    })

    let handleMouseMove = e => {
        // get x/y coords of mouse relative to button
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // update css property to move radial gradient
        button.current.style.setProperty("--mouse-x", `${x}px`);
        button.current.style.setProperty("--mouse-y", `${y}px`);
    }

    return(
        <div 
            ref={button}
            className="w-full flex justify-end h-1/6 pb-4 md:pb-0"
            onMouseMove={handleMouseMove}
        >
            <button 
                id="next-task-btn"
                disabled={disabled}
                className="md:w-56 w-4/6 h-8 md:h-10
                    cursor-pointer rounded no-highlight
                    bg-primary 
                    mb-6 md:mb-4 mt-6 z-20 text-white
                    capitalize transition-all duration-75 md:text-xl" 
                onClick={()=>{ 
                    setPulsing(true);
                    handleClick();
                    props.next();
                }}
            >
                {props.text || "Next Task"} &gt;
            </button>
        </div>
    );
}

export default NextButton;