import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated } from 'react-spring';

import MultipleChoice from "./Tasks/MultipleChoice/MultipleChoice";
import TextOnly from "./Tasks/TextOnly/TextOnly";
import SpecifiedOrder from "./Tasks/SpecifiedOrder/SpecifiedOrder";
import DrawLetter from "./Tasks/DrawLetter/DrawLetter";
import Intersitial from "./Tasks/Intersitial";
import PageNotFound from "../PageNotFound";
import End from "./Tasks/End";

import { setAnimClasses } from "../../actions/currTaskActions";

// return task component of specified type
function TaskManager(props) {
    let [animating, setAnimating] = useState(false);
    let [currentID, setCurrentID] = useState(null);
    let [out, setOut] = useState(false);
    let component;

    let handleCorrect = () => {
        props.setAnimClasses("animate-bounce-y correct");
        setAnimating(true);
        setTimeout(() => {
            handleExit();
        }, 750);
    }
    let handleWrong = () => {
        props.setAnimClasses("animate-shake-x wrong");
        setAnimating(true);
        setTimeout(() => {
            props.setAnimClasses("");
            setAnimating(false);
            props.submit(false, props.taskData.type);
        }, 750);
    }

    let handleExit = () => {
        props.setAnimClasses("");
        setOut(true);
        setTimeout(() => {
            setOut(false);
            setAnimating(false);
            props.submit(true, props.taskData.type);
        }, 600);
    }

    // refresh the fade in animation when task data changes
    useEffect(() => {
        if (!props.taskData.taskID) return;
        setCurrentID(props.taskData.taskID);
    }, [props.taskData.taskID])

    switch (props.taskData.type) {
        case "TextOnly":
            component = <TextOnly 
                    data={props.taskData} 
                    submit={() => handleExit()}
                    stats={props.stats}
                    setAnimating={setAnimating}
                />
            break;
        case "MultipleChoice":
            component = <MultipleChoice 
                    data={props.taskData} 
                    handleCorrect={() => handleCorrect()}
                    handleWrong={handleWrong}
                />
            break;
        case "SpecifiedOrder":
            component = <SpecifiedOrder 
                    data={props.taskData}
                    handleCorrect={() => handleCorrect()}
                    handleWrong={handleWrong} 
                    stats={props.stats}
                />
            break;
        case "DrawLetter":
            component = <DrawLetter 
                    data={props.taskData}
                    handleCorrect={() => handleCorrect()}
                    handleWrong={handleWrong} 
                />
            break;
        case "End":
            component = <End 
                    data={props.taskData} 
                    submit={() => handleExit()}
                    stats={props.stats}
                />
            break;
        case "Interstitial":
            component = <Intersitial 
                    data={props.taskData} 
                    submit={() => handleExit()}
                />
            break;
        default:
            component = <PageNotFound />
            break;
    }

    return(
        <AnimatedWrapper 
            animating={animating} 
            component={component} 
            key={currentID} 
            out={out}
        />
    )
}

function AnimatedWrapper(props) {
    const spring = useSpring({ 
        to: { 
            // opacity ends at -0.2 to ensure component fades out 
            // before reaching transform end
            opacity: props.out ? -0.2 : 1, 
            transform: props.out ? 
                "translate(-10vwx, 0)" : "translate(0vw, 0)" 
        }, 
        from: { 
            opacity: 0, 
            transform: "translate(0vw, 0)" 
        }
    });

    return(
        <animated.div 
            style={spring}
            className={`task w-11/12 
                h-4/6 min-h-[450px] md:min-h-[400px]
                md:w-7/12 relative px-2
                ${props.animating ? "pointer-events-none" : ""}`} 
        >
            { props.component }
        </animated.div>
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