import React, { useEffect } from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function PageNotFound(props) {
    useEffect(() => { 
        document.title = `Learn Punjabi - 404`
    }, []);

    return(
        <main style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <h1 className="visually-hidden">404 Error</h1>
            Page not found! :\
        </main>
    )
}

export default PageNotFound;