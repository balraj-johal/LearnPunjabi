import React, { useState, useEffect } from "react";

import TaskAnswer from "../TaskAnswer";
import AddButton from "../../../FormComponents/AddButton";
import FormError from "../../../FormComponents/FormError";

// this component contains the form used to edit a
// task of type MultipleChoice
function EditMultipleChoice(props) {
    let [data, setData] = useState({
        possibleAnswers: props.task.possibleAnswers || [],
        correctAnswerIndex: Number(props.task.correctAnswerIndex) || 0,
    })

    /** updates form state on change of form field value
     * @name onChange
     * @param {Object} e - change event
    */
    let onChange = e => {
        let dataCopy = {...data};
        if (e.target.id.includes("possible-answer-")) {
            let index = Number(e.target.id.substring(16));
            dataCopy.possibleAnswers[index].middleText = e.target.value;
        } else { 
            // update other properties if applicable
        }
        setData(dataCopy);
    }

    /** Marks the identified answer as the correct answer
     * @name selectAnswerAsCorrect
     * @param {Number} index
     */
    let selectAnswerAsCorrect = (index) => {
        let dataCopy = {...data};
        dataCopy.correctAnswerIndex = index;
        setData(dataCopy);
    }

    /** Add new answer to the task
     * @name addNewAnswer
     */
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
    /** Deletes a specified answer from the task
     * @name deleteAnswer
     * @param {Number} index - answer index
     */
    let deleteAnswer = (index) => {
        let dataCopy = {...data};
        dataCopy.possibleAnswers.splice(index, 1);
        setData(dataCopy);
    }

    /** Returns the answer styles if it is marked as correct
     * @param {Number} index - answer index
     * @returns {String} correct tailwind classes
     */
    let returnSelectedStyleClasses = (index) => {
        let selected = data.correctAnswerIndex === index;
        if (selected) return "bg-green-200";
        return "";
    }

    // when the form state changes, 
    // propogate the data to the parent lesson components state
    useEffect(() => {
        props.onAnswerDataChange(data);
    }, [data])

    // TODO: add bottomText input field
    return(
        <div style={{display: props.show ? "initial" : "none"}}>
            Possible Answers:
            <div className="possible-answers flex flex-wrap w-100 
                justify-center flex-row">
                {data.possibleAnswers?.map((possible, index) => (
                    <TaskAnswer 
                        key={index} 
                        index={index} 
                        value={possible.middleText} 
                        onChange={onChange}
                        extraStyles={returnSelectedStyleClasses(index)}
                    >
                        <div
                            className="absolute top-0 right-0 h-12 w-12 text-3xl 
                                flex justify-center items-center text-red-600" 
                            onClick={() => {deleteAnswer(index)}} 
                        > - </div>
                        <div
                            className={`absolute top-0 left-0 h-12 w-12 text-lg 
                                flex justify-center items-center text-green-500
                                ${data.correctAnswerIndex === index ? "hidden" : ""} transition-all  
                            `}
                            onClick={() => {selectAnswerAsCorrect(index)}} 
                        > ✓ </div>
                    </TaskAnswer>
                ))}
                <AddButton addNew={addNewAnswer} size="28" />
            </div>
            <FormError for="multipleChoice" errors={props.errors} />
        </div>
    )
}

export default EditMultipleChoice;