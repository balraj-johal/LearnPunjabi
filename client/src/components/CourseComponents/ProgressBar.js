import React, {  } from "react";
import { useSpring, animated } from 'react-spring';

function ProgressBar(props) {
    const spring = useSpring({ 
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    return (
        <animated.div 
            style={spring}
            className="w-full flex justify-center absolute 
                top-4 md:top-10 md:shadow-2xl z-[60]"
        >
            <div 
                id="progress-bar-bg"
                className="h-2 md:w-10/12 w-11/12 bg-gray-400
                    md:bg-white rounded-xl left-1/12 overflow-hidden"
            >
                <div 
                    className={`rounded-xl h-full bg-primary 
                        transition-all duration-300`} 
                    style={{width: `${props.percent}%`}}>
                </div>
            </div>
        </animated.div>
      );
}

export default ProgressBar;