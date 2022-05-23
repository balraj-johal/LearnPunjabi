import React, {  } from "react";

import InfoPoint from "./InfoPoint";

function InfoPoints(props) {
    return(
        <div id="info-points">
            <InfoPoint 
                index={1} 
                title="Learn Quickly"
                text="Only have 5 minutes? No worries, our platform is designed to teach you in short bursts of content." 
            /> 
            <InfoPoint 
                index={2} 
                title="Learn Effectively"
                text="Using proven learning techniques such as Spaced Repetition and the Heisig technique we make it easy to learn a new alphabet!" 
            /> 
            <InfoPoint 
                index={3} 
                title="Learn Enjoyably"
                text="Our lessons are designed to be quick and enjoyable to complete, because no one learns when they're bored or frustrated!" 
            /> 
        </div>
    )
}

export default InfoPoints;