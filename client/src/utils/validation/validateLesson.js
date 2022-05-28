let _getLessonValidationErrors = (lesson) => {
    let errors = {};

    if (lesson.name.length < 1) errors.name = "Lesson Name is required"
    if (lesson.requiredCompletions < 1) errors.requiredCompletions = "Lesson must require at least 1 completion"
    if (lesson.tasks.length < 1) errors.tasks = "At least 1 task is required"

    lesson.tasks.forEach(task => {
        // create a new errors object for each specific task
        errors[`${task.taskID}`] = {};
        switch (task.type) {
            case "TextOnly":
                _validateTextOnly(task, errors[`${task.taskID}`])
                break;
            case "SpecifiedOrder":
                _validateSpecifiedOrder(task, errors[`${task.taskID}`])
                break;
            case "MultipleChoice":
                _validateMultipleChoice(task, errors[`${task.taskID}`])
                break;
            default:
                break;
        }
        if (_isObjectEmpty(errors[`${task.taskID}`])) {
            delete errors[`${task.taskID}`];
        }
    })

    if (lesson.noToSample & lesson.shuffle) {
        if (lesson.noToSample > lesson.tasks.length) {
            errors.noToSample = "Sample number higher than task amount"
        }
    } 

    return errors;
};

let _validateTextOnly = (task, errors) => {
    if (task.text.length < 1) errors.text = "Task text is required"
}
let _validateSpecifiedOrder = (task, errors) => {
    if (task.text.length < 1) errors.text = "Task text is required"
    if (task.possibleAnswers.length < 2) errors.specifiedOrder = "Task must have at least 2 possible answers"
    task.possibleAnswers.forEach(answer => {
        if (answer.text.length < 1) errors.specifiedOrder = "Possible answers cannot be empty"
    })
    if (task.correctAnswer.length < 1) errors.specifiedOrder = "Task must have a correct answer"
}
let _validateMultipleChoice = (task, errors) => {
    if (task.text.length < 1) errors.text = "Task text is required"
    if (task.possibleAnswers) {
        if (task.correctAnswerIndex === null || task.correctAnswerIndex === undefined) errors.multipleChoice = "Task must have a correct answer"
        task.possibleAnswers.forEach(answer => {
            if (answer.middleText.length < 1) errors.multipleChoice = "Possible answers cannot be empty"
        })
        if (task.possibleAnswers.length < 2) errors.multipleChoice = "Task must have at least 2 possible answers"
    } else {
        errors.multipleChoice = "Task must have at least 2 possible answers"
    }
}

let _isObjectEmpty = (object) => {
    return Object.keys(object).length === 0;
}

export { _getLessonValidationErrors, _isObjectEmpty };