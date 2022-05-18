import React, {  } from "react";
import { connect } from "react-redux";
import NextButton from "./NextButton";

function End(props) {
    return(
        <div className="lesson-end flex flex-col items-center h-full justify-center pb-20">
            <span>{props.data.text}</span>
            {props.data.showPercentCorrect ? (
                <span className="my-8">
                    You got {props.stats} of your answers correct!
                </span>
            ) : null }
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