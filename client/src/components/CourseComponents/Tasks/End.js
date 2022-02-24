import React, {  } from "react";
import { connect } from "react-redux";

function End(props) {
    return(
        <div className="lesson-end">
            {props.data.text}
            You got {props.stats} of your answers correct!
            <div onClick={()=>{
                props.submit(true);
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
)(End);