import React, { useCallback, useEffect, useState } from "react";
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
import { playAudio } from "../../../actions/lessonStatusActions";

// return task component of specified type
function TaskManager(props) {
    let [animating, setAnimating] = useState(false);
    let [currentID, setCurrentID] = useState(null);
    let [out, setOut] = useState(false);
    const taskData = props.taskData;
    let task;

    let handleCorrect = () => {
        props.playAudio("correct");
        props.setAnimClasses("animate-bounce-y correct");
        setAnimating(true);
        setTimeout(() => {
            handleExit();
        }, 750);
    }

    let handleWrong = () => {
        props.playAudio("wrong");
        props.setAnimClasses("animate-shake-x wrong");
        setAnimating(true);
        setTimeout(() => {
            props.setAnimClasses("");
            setAnimating(false);
            props.submit(false, taskData.type);
        }, 750);
    }

    /**
     * begin task out animation and submit task success
     * @name handleExit
     */
    let handleExit = useCallback(() => {
        props.setAnimClasses("");
        setAnimating(true);
        setOut(true);
        setTimeout(() => {
            setOut(false);
            setAnimating(false);
            props.submit(true, taskData.type);
        }, 600);
    }, [taskData])

    // refresh the fade in animation when task data changes
    useEffect(() => {
        if (!props.taskData.taskID) return;
        setCurrentID(props.taskData.taskID);
    }, [props.taskData.taskID])

    switch (props.taskData.type) {
        case "TextOnly":
            task = <TextOnly 
                    data={props.taskData} 
                    submit={() => {
                        props.playAudio("correct");
                        handleExit();
                    }}
                    stats={props.stats}
                    setAnimating={setAnimating}
                />
            break;
        case "MultipleChoice":
            task = <MultipleChoice 
                    data={props.taskData} 
                    handleCorrect={handleCorrect}
                    handleWrong={handleWrong}
                />
            break;
        case "SpecifiedOrder":
            task = <SpecifiedOrder 
                    data={props.taskData}
                    handleCorrect={handleCorrect}
                    handleWrong={handleWrong} 
                    stats={props.stats}
                />
            break;
        case "DrawLetter":
            task = <DrawLetter 
                    data={props.taskData}
                    handleCorrect={handleCorrect}
                    handleWrong={handleWrong} 
                />
            break;
        case "End":
            task = <End 
                    data={props.taskData} 
                    hideButton={props.taskData.hideButton}
                    submit={() => {
                        props.playAudio("end");
                        handleExit();
                    }}
                    stats={props.stats}
                />
            break;
        case "Interstitial":
            task = <Intersitial 
                    data={props.taskData} 
                    submit={() => {
                        props.playAudio("correct");
                        handleExit();
                    }}
                />
            break;
        default:
            task = <PageNotFound />
            break;
    }

    return(
        <div className={`${props.override ? "w-5/6 h-3/4 rounded" : "w-full h-full"}
            md:h-4/6 md:w-8/12 md:rounded md:min-h-[500px]
            lg:w-8/12 lg:mt-[-1rem] lg:min-w-[900px]
            xl:w-6/12
            relative flex items-center justify-center 
            bg-white dark-primary shadow-xl
            animate-fade-in overflow-hidden`}
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
        <animated.main 
            style={spring}
            className={`task w-full h-full min-h-[450px] md:min-h-[400px]
                relative px-6 pt-16 pb-10 sm:p-10 lg:px-14 text-black 
                md:text-lg text-sm dark-primary
                ${props.animating ? "pointer-events-none" : ""}
            `} 
        >
            { props.task }
        </animated.main>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    currTask: state.currTask,
});

export default connect(
    mapStateToProps,
    { setAnimClasses, playAudio }
)(TaskManager);