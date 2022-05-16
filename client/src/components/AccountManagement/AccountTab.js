import React, {  } from "react";

function AccountTab(props) {
    return(
        <div 
            className={`text-lg w-6/12 h-10 md:h-12 transition-all no-highlight pt-[3px]
                ${props.first ? "border-r-2" : ""}  border-black 
                flex justify-center items-center cursor-pointer border-b-2
                active:bg-primary2 active:text-white
                ${props.managerState === props.for ? 
                    "bg-primary text-white" : 
                    "hover:bg-slate-200"
            }`}
            onClick={() => { props.setManagerState(props.for) }}
        >
            { props.for }
        </div>
    )
}

export default AccountTab;