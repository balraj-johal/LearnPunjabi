import React, {  } from "react";

import InfoPoint from "./InfoPoint";

function InfoPoints(props) {
    return(
        <div id="info-points" className="h-5/6 flex flex-col justify-evenly w-full
            pl-4 md:pl-20">
            <InfoPoint 
                index={1} 
                title="Learn Quickly"
                text="Only have 5 minutes? No worries, our platform 
                    is designed to teach you in short bursts of content." 
                textShort="Only have 5 minutes? No worries!" 
            /> 
            <InfoPoint 
                index={2} 
                title="Learn Effectively"
                text="Using proven learning techniques such as 
                    Spaced Repetition and the Heisig technique we 
                    make it easy to learn a new alphabet!" 
                textShort="We use proven techniques making learning easy!" 
            /> 
            <InfoPoint 
                index={3} 
                title="Learn Enjoyably"
                text="Our lessons are designed to be quick and enjoyable 
                    to complete, because no one learns when 
                    they're bored or frustrated!" 
                textShort="Our lessons are quick and enjoyable!" 
            /> 
        </div>
    )
}

export default InfoPoints;