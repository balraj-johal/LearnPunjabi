import React, {  } from "react";
import { connect } from "react-redux";

function TextOnly(props) {
    let submitContinue = () => {
        props.submit(true);
    }

    console.log(props.data)

    return(
        <div className="task text-only">
            { props.data.text }
            <div onClick={()=>{
                submitContinue();
            }}>
                Next &gt;
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