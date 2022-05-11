import React, { useEffect } from "react";

function ProgressBar(props) {

    return (
        <div className="w-full flex justify-center absolute top-4 md:top-10">
            <div className="h-2 w-10/12 bg-gray-400 rounded-xl left-1/12">
                <div className={`rounded-xl h-full bg-primary transition-all duration-300`} 
                    style={{width: `${props.percent}%`}}>
                </div>
            </div>
        </div>
      );
}

export default ProgressBar;