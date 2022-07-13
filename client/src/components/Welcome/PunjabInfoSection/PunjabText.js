import React, { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring';

const textOptions = [
    "Punjab is a reigon in South Asia covering areas in India and Pakistan.",
    'It has a population of 28 million speaking a range of languages.".',
    'Punjab was divided in Partition into West Punjab in Pakistan, and East in India.',
    'And then divided again between states in India in 1966.',
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
        props.setTextVisible(false);
        setTimeout(() => {
            setText(textOptions[props.pageIndex]);
            props.setTextVisible(true);
        }, 500)
    }, [props.pageIndex])

    return(
        <animated.div 
            style={spring}
            className="absolute w-full bottom-0 h-1/3 
                font-normal text-xl 
                md:px-12 md:pt-10 md:text-3xl 
                lg:text-4xl lg:px-16 lg:pt-20 lg:pr-48 xl:pr-80
                pt-10 pl-4 pr-6"
            id="punjab-text"
        >
            <span className="bg-white text-black pl-3 pr-3
                md:leading-[3rem] lg:leading-[3.5rem] box-decoration-clone"
            >
                { text }
            </span>
        </animated.div>
    )
})

export default PunjabText;