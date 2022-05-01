import React, { useEffect, useRef, useState } from "react";

import MultipleChoice from "./Tasks/MultipleChoice/MultipleChoice";
import TextOnly from "./Tasks/TextOnly/TextOnly";
import End from "./Tasks/End";
import SpecifiedOrder from "./Tasks/SpecifiedOrder/SpecifiedOrder";
import DrawLetter from "./Tasks/DrawLetter/DrawLetter";
import Intersitial from "./Tasks/Intersitial";
import PageNotFound from "../PageNotFound";

// return task component of specified type
function TaskManager(props) {
    let ref = useRef();
    let [animating, setAnimating] = useState(false);
    let [animClasses, setAnimClasses] = useState("");
    let component;

    let handleCorrect = () => {
        setAnimClasses("animate-bounce-y correct");
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
            setAnimClasses("");
            props.submitAnswer(true);
        }, 750);
    }
    let handleWrong = () => {
        setAnimClasses("animate-shake-x wrong");
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
            setAnimClasses(""); 
            props.submitAnswer(false);
        }, 750);
    }

    // refresh the fade in animation when task data changes
    useEffect(() => {
        alert("refresh")
        ref.current.classList.remove("animate-fade-in");
        ref.current.classList.add("animate-fade-in");
    }, [props.taskData])

    switch (props.taskData.type) {
        case "TextOnly":
            component = <TextOnly 
                    data={props.taskData} 
                    submit={props.submitAnswer}
                    stats={props.stats}
                    setAnimating={setAnimating}
                    setAnimClasses={setAnimClasses}
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
        <div className={`task px-2 w-11/12 md:w-7/12
            ${animClasses} ${animating ? "pointer-events-none" : ""}`} 
            ref={ref}
        >
            { component }
        </div>
    )
}

export default TaskManager;