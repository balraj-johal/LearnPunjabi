import React, { useEffect, useRef } from "react";

function PopInModal(props) {
    let ref = useRef();

    useEffect(() => {
        if (!props.show) return;
        let animTimeout = setTimeout(() => {
            ref.current.classList.remove("animate-move-down");
            ref.current.classList.add("animate-move-up");
        }, props.length - 500);
        let unrenderTimeout = setTimeout(() => {
            props.unrender();
        }, props.length);

        return () => { 
            clearTimeout(unrenderTimeout);
            clearTimeout(animTimeout);
        };
    }, [props.show])

    return(
        <div ref={ref} 
            className={`z-10 absolute top-0 left-0 w-screen h-12
                animate-move-down text-white text-lg
                flex flex-row justify-center
                ${props.show ? "" : "hidden"}    
            `}
        >
            <div className={`min-w-40 w-10/12 sm:w-6/12 md:w-3/12 h-28 p-10 text-center
            bg-primary drop-shadow-lg
            flex justify-center items-center`}>
                {props.text}
            </div>
        </div>
    )
}

export default PopInModal;