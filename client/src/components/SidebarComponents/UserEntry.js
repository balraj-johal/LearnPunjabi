import React from "react";
import firstPlace from "../../res/icons/leaderboards/gold-medal.png";
import secondPlace from "../../res/icons/leaderboards/silver-medal.png";
import thirdPlace from "../../res/icons/leaderboards/bronze-medal.png";

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
            return <img 
                src={firstPlace} 
                className="h-full w-auto mr-2" 
                alt="First Place Medal"
            />
        case 1:
            return <img 
                src={secondPlace} 
                className="h-full w-auto mr-2" 
                alt="Second Place Medal"
            />
        case 2:
            return <img 
                src={thirdPlace} 
                className="h-full w-auto mr-2"
                alt="Third Place Medal"
             />
        default:
            break;
    }
}

export default UserEntry;