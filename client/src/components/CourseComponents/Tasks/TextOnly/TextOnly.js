import React, {  } from "react";
import { connect } from "react-redux";

import testImg from "../../../../res/icons/fella.png"
import NextButton from "../NextButton";

function TextOnly(props) {
    let submitContinue = () => {
        setTimeout(() => {
            props.submit(true);
        }, 200);
    }

    return(
        <div className="text-only flex flex-row h-full">
            <div className="w-3/12 flex items-center justify-center">
                <img src={testImg} className="mb-14" />
            </div>
            <div className="w-1/12">
            </div>
            <div id="text-only-content" className="w-9/12 flex flex-col justify-center">
                { props.data.text } 
                <NextButton next={submitContinue} />
            </div>
        </div>
    );
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
    }
)(TextOnly);