import React, {  } from "react";
import { connect } from "react-redux";
import NextButton from "./NextButton";

function Intersitial(props) {
    return(
        <div className="lesson-interstitial flex flex-col items-center h-full justify-center">
            <span>{props.data.text}</span>
            <span className="my-8">
                Good job! You're doing great!
            </span>
            <NextButton next={()=>{ props.submit(true) }} />
        </div>
    );
}

//pull relevant props from redux state
const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {}
)(Intersitial);