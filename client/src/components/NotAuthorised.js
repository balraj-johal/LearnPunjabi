import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function NotAuthorised(props) {
    return(
        <main style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            You do not have the required permissions for this action.
        </main>
    )
}

export default NotAuthorised;