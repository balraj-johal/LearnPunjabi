import React, { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring';

const textOptions = [
    "Punjab is a reigon in South Asia covering areas in India and Pakistan.",
    'Translated to English, the name means "The Land of Five Rivers".',
    'Translated to English, the name means "The Land of Five Rivers".',
    'Translated to English, the name means "The Land of Five Rivers".',
    'Translated to English, the name means "The Land of Five Rivers".',
]

const PunjabText = React.forwardRef((props, ref) => {
    let [text, setText] = useState("");

    const spring = useSpring({
        from: { opacity: 0 },
        to: { opacity: props.textVisible ? 1 : 0 },
    })

    // fade text in and out when it changes
    useEffect(() => {
        console.log("log")
        props.setTextVisible(false);
        setTimeout(() => {
            console.log("log2")
            setText(textOptions[props.pageIndex]);
            props.setTextVisible(true);
        }, 500)
    }, [props.pageIndex])

    return(
        <animated.div 
            style={spring}
            className="absolute w-full
                text-xl md:text-2xl lg:text-2xl text-black
                pt-10 pl-4 pr-6 md:px-12 md:pt-10 lg:px-16 lg:pt-20"
            id="punjab-text"
        >
            { text }
        </animated.div>
    )
})

export default PunjabText;