import React, { useEffect, useRef, useState } from "react";
import RiversStraight from "./RiversStraight";

function RiversMid(props) {
    let top = useRef();
    let [svgHeight, setSvgHeight] = useState(0);
    let [mapArray, setMapArray] = useState([]);

    let calculate = () => {
        if (top.current.clientHeight <= 0) return setTimeout(() => { calculate() }, 100);
        setSvgHeight(top.current.clientHeight);
        let noStraights = Math.ceil(window.innerHeight/top.current.clientHeight) - 1;
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
            <svg
                id="rivers-mid" ref={top} style={{top: "0"}}
                width="30%" height="106%" viewBox="0 0 558 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M113.143 -4.42109e-06C113.143 555.718 113.571 556.718 113.571 1097M12 0C12 555.718 12.4286 556.718 12.4286 1097M214.286 -8.84219e-06C214.286 555.718 214.714 556.718 214.714 1097M315.429 -1.32633e-05C315.429 555.718 315.857 556.718 315.857 1097M416.571 -1.76844e-05C416.571 555.718 417 556.718 417 1097" stroke="#00A3FF" strokeWidth="23"/>
            </svg>
            { mapArray.map((elem, index) => (
                <RiversStraight index={index+1} height={svgHeight} key={index} end="middle" />
            )) }
        </>
    )
}

export default RiversMid;