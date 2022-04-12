import React from "react";

/** Leaderboard entry for user
 */
function UserEntry(props) {
    return(
        <div className="user-entry">
            <p>{props.user.username}</p>
            <p>{props.user.weeklyXP}XP</p>
        </div>
    )
}

export default UserEntry;