import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from 'react-loader-spinner';

function Loader(props) {
    return(
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
    )
}

export default Loader;