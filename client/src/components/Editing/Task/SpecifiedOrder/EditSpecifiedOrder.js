import React, { useState, useEffect } from "react";

import AddButton from "../../../FormComponents/AddButton";
import FormInput from "../../../FormComponents/FormInput";
import FormError from "../../../FormComponents/FormError";
import TaskAnswer from "../TaskAnswer";

// this component contains the form used to edit 
// a task of type SpecifiedOrder
function EditSpecifiedOrder(props) {
    let [data, setData] = useState({
        possibleAnswers: props.task.possibleAnswers || [],
        correctAnswer: props.task.correctAnswer || "",
    })

    /** updates form state on change of form field value
     * @name onChange
     * @param {Object} e - change event
    */
    let onChange = e => {
        let dataCopy = {...data};
        if (e.target.id.includes("possible-answer-")) {
            let index = Number(e.target.id.substring(16));
            dataCopy.possibleAnswers[index].text = e.target.value;
        } else { 
            dataCopy[e.target.id] = e.target.value;
        }
        setData(dataCopy);
    }

    /** gets index of first currently unused answer ID number
     * @name getNewAnswerID
     * @returns {Number} index
     */
    let getNewAnswerID = () => {
        let answers = data.possibleAnswers;
        let found = new Array(answers.length);
        found.fill(0);
        answers.forEach(answer => { 
            found[Number(answer.id?.replace("a-", ""))] = 1; 
        });
        for (let i = 0; i < found.length; i++) {
            if (found[i] === 0) return i;
        }
        return answers.length;
    }

    /** Add new answer fragment option to the task
     * @name addNewAnswer
     */
    let addNewAnswer = () => {
        let dataCopy = {...data};
        if (!dataCopy.possibleAnswers) dataCopy.possibleAnswers = [];
        let newAnswer = { text: "", id: `a-${getNewAnswerID()}` };
        dataCopy.possibleAnswers.push(newAnswer);
        setData(dataCopy);
    }
    /** Deletes a specified answer fragment option from the task
     * @name deleteAnswer
     * @param {Number} index - answer fragment index
     */
    let deleteAnswer = (index) => {
        let dataCopy = {...data};
        dataCopy.possibleAnswers.splice(index, 1);
        setData(dataCopy);
    }

    // when the form state changes, 
    // propogate the data to the parent lesson components state
    useEffect(() => { props.onAnswerDataChange(data); }, [data])

    return(
        <div style={{display: props.show ? "initial" : "none"}}>
            Possible Answers:
            <div className="possible-answers flex flex-wrap w-100 
                justify-center flex-row">
                {data.possibleAnswers?.map((possible, index) => (
                    <TaskAnswer 
                        key={index} 
                        index={index} 
                        value={possible.text} 
                        onChange={onChange}
                    >
                        <div
                            className="absolute top-0 right-0 h-12 w-12 text-3xl 
                                flex justify-center items-center text-red-600" 
                            onClick={() => {deleteAnswer(index)}} 
                        > - </div>
                    </TaskAnswer>
                ))}
                <AddButton addNew={addNewAnswer} size="28" />
            </div>
            <FormInput
                for="correctAnswer" 
                onChange={onChange}
                placeholder="Correct Answer"
                value={data.correctAnswer}
                extraStyles="w-5/12" // TODO: width not being overwritten
                type="text" 
                errors={props.errors}
            /> 
            <FormError for="specifiedOrder" errors={props.errors} />
        </div>
    )
}

export default EditSpecifiedOrder;