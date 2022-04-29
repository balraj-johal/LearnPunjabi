import React from "react";
import Topbar from "./Topbar";

function InternalPage({ children, ...props }) {
    return(
        <>
        <Topbar />
            <div className="container animate-fade-in">
                { children }
            </div>
        </>
    )
}

export default InternalPage;