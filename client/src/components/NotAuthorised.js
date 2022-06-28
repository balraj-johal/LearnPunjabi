import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function NotAuthorised(props) {
    return(
        <main id="unauthorised" style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <h1 className="visually-hidden">Unauthorised</h1>
            You do not have the required permissions for this action.
        </main>
    )
}

export default NotAuthorised;