import React, {  } from "react";
import { connect } from "react-redux";

function AccountTab(props) {
    const isSelected = props.managerState === props.for;

    let getBorderRadius = () => {
        if (props.mobile) return "0";
        if (props.first) return "0.375rem 0 0 0";
        return "0 0.375rem 0 0";
    }

    return(
        <div 
            className={`
                text-md w-6/12 h-9
                md:h-12 md:text-lg
                transition-all no-highlight pt-[3px]
                ${ props.first ? "" : "" }   
                flex justify-center items-center cursor-pointer 
                ${ isSelected ? 
                    "dark-elevated" : 
                    "bg-primary text-white dark-primary" }`}
            style={{ borderRadius: getBorderRadius() }}
            onClick={() => { props.setManagerState(props.for) }}
        >
            { props.for }
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    mobile: state.display.mobile,
});

export default connect(
    mapStateToProps,
    {}
)(AccountTab);