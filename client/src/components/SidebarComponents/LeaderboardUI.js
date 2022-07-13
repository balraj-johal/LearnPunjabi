import React, {  } from "react";

// component imports
import UserEntry from "./UserEntry";

function LeaderboardUI(props) {
    return(
        <div 
            id="leaderboard" 
            className={`${ props.lbStyles }`}
            style={{width: props.collapsible ? "w-full" : "calc(40% - 7px)"}}
            onClick={() => {
                if (props.collapsible) props.setCollapsed(!props.collapsed) 
            }}
        >
            <h1 
                className="header" 
                style={{
                    marginTop: props.collapsed ? "0px" : "15px",
                    transition: "all 150ms"
                }}
            >Weekly Leaderboard</h1>
            <ol 
                id="leaderboard-list" 
                className={`${props.listStyles} animate-fade-in`} 
            >
                {props.data.map((user, index) => 
                    <UserEntry user={user} key={user._id} index={index} />
                )}
            </ol>
        </div>
    )
}

export default LeaderboardUI;