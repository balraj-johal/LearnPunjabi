import React, { useState, useEffect } from "react";

function EditSpecifiedOrder(props) {
    // TODO: bottomText & middleText params
    let [data, setData] = useState({
        possibleAnswers: props.task.possibleAnswers,
        correctAnswer: props.task.correctAnswer
    })

    let onChange = e => {
        console.log(`changing ${e.target.id} to ${e.target.value}`)
        let dataCopy = {...data};
        if (e.target.id.includes("possible-answer-")) {
            let index = Number(e.target.id.substring(16));
            dataCopy.possibleAnswers[index].middleText = e.target.value;
        } else { 
            dataCopy[e.target.id] = e.target.value;
        }
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
                            className="rounded border-2 border-black px-1 py-0.5 
                                w-28 h-28 text-center m-3"
                            value={possible.middleText} 
                            id={`possible-answer-${index}`} 
                            onChange={onChange}
                            // onClick={() => {selectAnswerAsCorrect(index)}}
                        />
                        <div
                            className="absolute top-0 right-0 h-12 w-12 text-3xl 
                                flex justify-center items-center text-red-600" 
                            onClick={() => {deleteAnswer(index)}} 
                        >
                            -
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
                {/* {data.possibleAnswers?.map((possible, index) => (
                    <input
                        key={index}
                        value={possible.middleText} 
                        id={`possible-answer-${index}`}
                        onChange={onChange}
                        className="rounded border-2 border-black px-1 py-0.5"
                    />
                ))} */}
            </div>
            <div className="input-field my-4 flex flex-col w-6/12 m-auto">
                <div 
                    htmlFor="name"
                    style={{textTransform: "capitalize"}}
                    className=""
                >
                    Correct Answer:
                </div>
                <input
                    onChange={onChange}
                    value={data.correctAnswer}
                    id="correctAnswer"
                    // error={errors.correctAnswer}
                    className="rounded border-2 border-black px-1 py-0.5 w-full my-0.5"
                />
            </div>
        </div>
    )
}

export default EditSpecifiedOrder;