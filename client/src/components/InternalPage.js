import React, {  } from "react";
import Topbar from "./Topbar";

function InternalPage({ children, ...props }) {
    
    /** gets the height in pixels of the topbar-wrap, including if present, the leaderboard
     * @name getTopbarHeight
     * @returns {Number} height
     */
    let getTopbarHeight = () => {
        let topbarWrap = document.getElementById("topbar-wrap");
        if (!topbarWrap) return;
        console.log(topbarWrap.clientHeight)
        return topbarWrap.clientHeight;
    }
    
    return(
        <>
            <Topbar />
            <div className="container flex" style={{height: `calc(100vh - ${getTopbarHeight()}px)`}} >
                { children }
            </div>
        </>
    )
}

export default InternalPage;