import React, {  } from "react";

import Thing from "./Thing";

function ThreeThings(props) {
    return(
        <div id="three-things">
            <Thing 
                index={1} 
                title={"title"} 
                text="Learn Punjabi quickly and effectively using our intuitive learning system." 
            /> 
            <Thing 
                index={2} 
                title={"title"} 
                text="Learn Punjabi quickly and effectively using our intuitive learning system." 
            /> 
            <Thing 
                index={3} 
                title={"title"} 
                text="Learn Punjabi quickly and effectively using our intuitive learning system." 
            /> 
        </div>
    )
}

export default ThreeThings;