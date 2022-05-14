import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import MultipleChoice from "./Tasks/MultipleChoice/MultipleChoice";
import TextOnly from "./Tasks/TextOnly/TextOnly";
import End from "./Tasks/End";
import SpecifiedOrder from "./Tasks/SpecifiedOrder/SpecifiedOrder";
import DrawLetter from "./Tasks/DrawLetter/DrawLetter";
import Intersitial from "./Tasks/Intersitial";
import PageNotFound from "../PageNotFound";

import { setAnimClasses } from "../../actions/currTaskActions";

// return task component of specified type
function TaskManager(props) {
    let [animating, setAnimating] = useState(false);
    let [fadeIn, setFadeIn] = useState("0");
    let component;

    let handleCorrect = () => {
        props.setAnimClasses("animate-bounce-y correct");
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
            props.setAnimClasses("");
            props.submitAnswer(true);
        }, 750);
    }
    let handleWrong = () => {
        props.setAnimClasses("animate-shake-x wrong");
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
            props.setAnimClasses("");
            props.submitAnswer(false);
        }, 750);
    }

    // refresh the fade in animation when task data changes
    useEffect(() => {
        if (!props.taskData.taskID) return;
        setFadeIn("0");
        setTimeout(() => {
            setFadeIn("1");
        }, 50);
    }, [props.taskData.taskID])

    switch (props.taskData.type) {
        case "TextOnly":
            component = <TextOnly 
                    data={props.taskData} 
                    submit={props.submitAnswer}
                    stats={props.stats}
                    setAnimating={setAnimating}
                />
            break;
        case "MultipleChoice":
            component = <MultipleChoice 
                    data={props.taskData} 
                    handleCorrect={handleCorrect}
                    handleWrong={handleWrong}
                />
            break;
        case "SpecifiedOrder":
            component = <SpecifiedOrder 
                    data={props.taskData}
                    handleCorrect={handleCorrect}
                    handleWrong={handleWrong} 
                    stats={props.stats}
                />
            break;
        case "DrawLetter":
            component = <DrawLetter 
                    data={props.taskData}
                    handleCorrect={handleCorrect}
                    handleWrong={handleWrong} 
                />
            break;
        case "End":
            component = <End 
                    data={props.taskData} 
                    submit={props.submitAnswer}
                    stats={props.stats}
                />
            break;
        case "Interstitial":
            component = <Intersitial 
                    data={props.taskData} 
                    submit={props.submitAnswer}
                    stats={props.stats}
                />
            break;
        default:
            component = <PageNotFound />
            break;
    }

    return(
        <div 
            className={`task w-11/12 md:w-7/12 md:h-4/6 h-5/6 md:mt-0 mt-10 px-2 relative 
                ${animating ? "pointer-events-none" : ""}`} 
            fadein={fadeIn || "0"}
            onAnimationEnd={() => { setFadeIn("2") }}
        >
            { component }
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    currTask: state.currTask,
});

export default connect(
    mapStateToProps,
    { setAnimClasses }
)(TaskManager);