import React, {  } from "react";

function RiversStraight(props) {
    let styles;
    switch (props.end) {
        case "top":
            styles = {top: `${props.height * props.index - 4}px`};
            break;
        case "middle":
            styles = {top: `${(props.height * props.index)}px`};
            break;
        case "end":
            styles = {bottom: `${props.height * props.index - (0.055 * window.innerHeight)}px`};
            break;
        default:
            styles = {top: `${props.height * props.index - 2}px`};
            break;
    }
    return(
        <svg 
            style={styles} 
            id="rivers-mid" 
            width="30%" 
            height="106%" 
            viewBox="0 0 558 1000"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                stroke="#00A3FF" 
                strokeWidth="23"
                d="M113.143 -4.42109e-06C113.143 555.718 113.571 556.718 113.571
                    1097M12 0C12 555.718 12.4286 556.718 12.4286 1097M214.286 
                    -8.84219e-06C214.286 555.718 214.714 556.718 214.714 1097M315.429 
                    -1.32633e-05C315.429 555.718 315.857 556.718 315.857 1097M416.571 
                    -1.76844e-05C416.571 555.718 417 556.718 417 1097" 
            />
        </svg>
    )
}

export default RiversStraight;