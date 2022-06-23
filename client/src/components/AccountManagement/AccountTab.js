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
        <button 
            role={"tab"}
            aria-selected={isSelected}
            tabIndex={0}
            id={`tab-${props.for}`}
            className={`account-tab text-md w-6/12 h-9 font-bold
                relative
                md:h-12 md:text-lg
                transition-all no-highlight pt-[3px]
                flex justify-center items-center cursor-pointer 
                ${ isSelected ? "selected" : 
                    "bg-primary text-white dark-primary" }`}
            style={{ borderRadius: getBorderRadius() }}
            onClick={() => { props.setManagerState(props.for) }}
        >
            { props.for }
        </button>
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