import React from "react";
import firstPlace from "../../res/icons/leaderboards/podium1.png";
import secondPlace from "../../res/icons/leaderboards/podium2.png";
import thirdPlace from "../../res/icons/leaderboards/podium3.png";

/** Leaderboard entry for user
 */
function UserEntry(props) {
    return(
        <div className="user-entry h-10 items-center">
            <div className="h-full flex items-center">
                <PodiumPlace index={props.index} />
                <p>{props.user.username}</p>
            </div>
            <p>{props.user.weeklyXP}XP</p>
        </div>
    )
}

function PodiumPlace(props) {
    switch (props.index) {
        case 0:
            return <img src={firstPlace} className="h-full w-auto mr-2" />
        case 1:
            return <img src={secondPlace} className="h-full w-auto mr-2" />
        case 2:
            return <img src={thirdPlace} className="h-full w-auto mr-2" />
        default:
            break;
    }
}

export default UserEntry;