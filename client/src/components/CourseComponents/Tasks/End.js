import React, {  } from "react";
import { connect } from "react-redux";
import NextButton from "./NextButton";

function End(props) {
    return(
        <div className="lesson-end flex flex-col items-center h-full justify-center">
            <span>{props.data.text}</span>
            <span className="my-8">
                You got {props.stats} of your answers correct!
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
    {
    }
)(End);