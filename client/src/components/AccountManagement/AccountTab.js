import React, {  } from "react";

function AccountTab(props) {
    const isSelected = props.managerState === props.for;

    let getBorderRadius = () => {
        if (props.first) return "5px 0 0 0";
        return "0 5px 0 0";
    }

    return(
        <div 
            className={`text-lg w-6/12 h-10 md:h-12 transition-all no-highlight pt-[3px]
                ${ props.first ? "" : "" }   
                flex justify-center items-center cursor-pointer 
                ${ !isSelected ? 
                    "bg-primary text-white" : 
                    "" }`}
            style={{ borderRadius: getBorderRadius() }}
            onClick={() => { props.setManagerState(props.for) }}
        >
            { props.for }
        </div>
    )
}

export default AccountTab;