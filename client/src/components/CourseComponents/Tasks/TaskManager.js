import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSpring, animated } from 'react-spring';

import MultipleChoice from "./MultipleChoice/MultipleChoice";
import TextOnly from "./TextOnly/TextOnly";
import SpecifiedOrder from "./SpecifiedOrder/SpecifiedOrder";
import DrawLetter from "./DrawLetter/DrawLetter";
import Intersitial from "./Intersitial";
import PageNotFound from "../../PageNotFound";
import End from "./End";

import { setAnimClasses } from "../../../actions/currTaskActions";

// return task component of specified type
function TaskManager(props) {
    let [animating, setAnimating] = useState(false);
    let [currentID, setCurrentID] = useState(null);
    let [out, setOut] = useState(false);
    let task;

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
            task = <TextOnly 
                    data={props.taskData} 
                    submit={() => handleExit()}
                    stats={props.stats}
                    setAnimating={setAnimating}
                />
            break;
        case "MultipleChoice":
            task = <MultipleChoice 
                    data={props.taskData} 
                    handleCorrect={() => handleCorrect()}
                    handleWrong={handleWrong}
                />
            break;
        case "SpecifiedOrder":
            task = <SpecifiedOrder 
                    data={props.taskData}
                    handleCorrect={() => handleCorrect()}
                    handleWrong={handleWrong} 
                    stats={props.stats}
                />
            break;
        case "DrawLetter":
            task = <DrawLetter 
                    data={props.taskData}
                    handleCorrect={() => handleCorrect()}
                    handleWrong={handleWrong} 
                />
            break;
        case "End":
            task = <End 
                    data={props.taskData} 
                    submit={() => handleExit()}
                    stats={props.stats}
                />
            break;
        case "Interstitial":
            task = <Intersitial 
                    data={props.taskData} 
                    submit={() => handleExit()}
                />
            break;
        default:
            task = <PageNotFound />
            break;
    }

    return(
        <div className="w-full md:w-8/12 lg:w-6/12 h-full md:h-4/6 
            relative flex items-center justify-center 
            bg-white rounded border-black shadow-xl
            animate-fade-in overflow-hidden"
        >
            <AnimatedWrapper 
                animating={animating} 
                task={task} 
                key={currentID} 
                out={out}
            />
        </div>
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
            // md:w-7/12 
            className={`task w-full h-full min-h-[450px] md:min-h-[400px]
                relative px-10 py-10 text-black
                ${props.animating ? "pointer-events-none" : ""}
            `} 
        >
            { props.task }
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