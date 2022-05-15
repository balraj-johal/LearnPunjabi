import React from "react";
import { useSpring, animated, config } from 'react-spring';

// number of stroke segments used for logo animation.
// effectively used to control duration
const STROKE_SEGMENTS = 50;

function LogoIcon(props) {
    const { x } = useSpring({
        from: { x: 0 },
        to: { x: 1 },
        delay: 200,
        config: config.molasses,
    })

    return(
        <animated.svg 
            className="no-highlight" 
            id="logo-icon"
            width="44.3" 
            height="50" 
            viewBox="0 0 36 39" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            strokeDasharray={STROKE_SEGMENTS}
            strokeDashoffset={x.to(x => (1 - x) * STROKE_SEGMENTS)}
        >
            <path d="M0 8C18 8 18 19 35.5 19M0 2C18 2 18 13 35.5 13M0 14C18 14 18 25 35.5 25M0 20C18 20 18 31 35.5 31M0 26C18 26 18 37 35.5 37" stroke="#00A3FF" strokeWidth="3"/>
        </animated.svg>

    )
}

export default LogoIcon;