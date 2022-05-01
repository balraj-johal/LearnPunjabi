import React, { useEffect } from "react";

function ProgressBar(props) {

    return (
        <div className="w-full flex justify-center absolute top-10">
            <div className="h-2 w-10/12 bg-gray-400 rounded-xl left-1/12">
                {/* for some reason the tailwind width class is not applying correctly.   */}
                <div className={`rounded-xl h-full w-[${props.percent}%] bg-primary transition-all duration-300`} 
                    style={{width: `${props.percent}%`}}>
                </div>
            </div>
        </div>
      );
}

export default ProgressBar;