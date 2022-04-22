import React, { useState, useEffect } from "react";

function EditMultipleChoice(props) {
    // TODO: bottomText & middleText params
    let [data, setData] = useState({
        possibleAnswers: props.task.possibleAnswers || [],
        correctAnswerIndex: props.task.correctAnswerIndex || 0,
    })

    let onFieldChange = e => {
        let dataCopy = {...data};
        if (e.target.id.includes("possible-answer-")) {
            let index = Number(e.target.id.substring(16));
            dataCopy.possibleAnswers[index].middleText = e.target.value;
        } else { 
            // update other properties if applicable
        }
        setData(dataCopy);
    }

    let selectAnswerAsCorrect = (index) => {
        let dataCopy = {...data};
        dataCopy.correctAnswerIndex = index;
        setData(dataCopy);
    }

    let addNewAnswer = () => {
        let dataCopy = {...data};
        let newAnswer = {
            middleText: "",
            bottomText: ""
        }
        if (!dataCopy.possibleAnswers) dataCopy.possibleAnswers = [];
        dataCopy.possibleAnswers.push(newAnswer);
        setData(dataCopy);
    }
    let deleteAnswer = (index) => {
        let dataCopy = {...data};
        dataCopy.possibleAnswers.splice(index, 1);
        setData(dataCopy);
    }

    let returnSelectedStyleClasses = (index) => {
        let selected = data.correctAnswerIndex === index;
        if (selected) return "bg-green-200"
        return ""
    }

    useEffect(() => {
        props.onAnswerDataChange(data);
    }, [data])

    return(
        <div style={{display: props.show ? "initial" : "none"}}>
            Possible Answers:
            <div className="possible-answers flex flex-wrap w-100 
                justify-center flex-row">
                {data.possibleAnswers?.map((possible, index) => (
                    <div 
                        className="relative"
                        key={index} 
                    >
                        <input
                            className={`rounded border-2 border-black px-1 py-0.5 
                                w-28 h-28 text-center m-3 transition-all
                                ${returnSelectedStyleClasses(index)}`}
                            value={possible.middleText} 
                            id={`possible-answer-${index}`} 
                            onChange={onFieldChange}
                        />
                        <div
                            className="absolute top-0 right-0 h-12 w-12 text-3xl 
                                flex justify-center items-center text-red-600" 
                            onClick={() => {deleteAnswer(index)}} 
                        >
                            -
                        </div>
                        <div
                            className={`absolute top-0 left-0 h-12 w-12 text-lg 
                                flex justify-center items-center text-green-500
                                ${data.correctAnswerIndex === index ? "hidden" : ""} transition-all  
                            `}
                            onClick={() => {selectAnswerAsCorrect(index)}} 
                        >
                            ✓
                        </div>
                    </div>
                ))}
                <div 
                    className="rounded border-2 border-black px-1 py-0.5 
                        w-28 h-28 text-center flex justify-center items-center
                        text-3xl text-blue-500 m-3" 
                    onClick={addNewAnswer}
                >
                    +
                </div>
            </div>
        </div>
    )
}

export default EditMultipleChoice;