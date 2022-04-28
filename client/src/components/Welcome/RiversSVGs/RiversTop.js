import React, { useEffect, useRef, useState } from "react";
import RiversStraight from "./RiversStraight";

function RiversTop(props) {
    let top = useRef();
    let [svgHeight, setSvgHeight] = useState(0);
    let [mapArray, setMapArray] = useState([]);

    let calculate = () => {
        if (top.current.clientHeight <= 0) return setTimeout(() => { calculate() }, 100);
        setSvgHeight(top.current.clientHeight);
        let noStraights = Math.ceil(window.innerHeight/top.current.clientHeight);
        let arr = new Array(noStraights).fill(0);
        setMapArray(arr);
    }

    useEffect(() => {
        window.addEventListener("resize", calculate);
        calculate();

        return () => { window.removeEventListener("resize", calculate) };
    }, [])

    return(
        <>
            <svg id="rivers-top" ref={top} width="30%" viewBox="0 0 558 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path height="100%"  d="M113.143 1000C113.143 444.282 298.571 444.282 298.571 -96M12 1000C12 444.282 197.429 444.282 197.429 -96M214.286 1000C214.286 444.282 399.714 444.282 399.714 -96M315.429 1000C315.429 444.282 500.857 444.282 500.857 -96M416.571 1000C416.571 444.282 602 444.282 602 -96" stroke="#00A3FF" strokeWidth="23"/>
            </svg>
            { mapArray.map((elem, index) => (
                <RiversStraight index={index+1} height={svgHeight} key={index} end="top" />
            )) }
        </>
    )
}

export default RiversTop;