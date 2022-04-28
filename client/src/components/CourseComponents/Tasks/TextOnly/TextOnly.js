import React, {  } from "react";
import { connect } from "react-redux";

import testImg from "../../../../res/icons/fella.png"
import NextButton from "../NextButton";

function TextOnly(props) {
    let submitContinue = () => {
        props.submit(true);
    }

    console.log(props.data)

    return(
        <div className="task text-only flex flex-row">
            <div className="w-3/12 flex items-center justify-center">
                <img src={testImg} className="mb-14" />
            </div>
            <div className="w-1/12">
            </div>
            <div id="text-only-content" className="w-9/12 flex flex-col">
                { props.data.text } 
                <NextButton next={submitContinue} />
                {/* <button className="w-28 text-white h-8 bg-primary cursor-pointer rounded
                    hover:bg-primary2 my-4 mt-6 hover:drop-shadow-md" 
                    onClick={()=>{ submitContinue() }}
                >
                    Next &gt;
                </button> */}
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