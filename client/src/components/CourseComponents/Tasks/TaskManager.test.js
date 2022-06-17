import { fireEvent, render, screen, waitFor } from '../../../utils/testing';
import TaskManager from './TaskManager';

const textOnlyData = {
    type: "TextOnly",
    taskID: "TextOnly",
};
it('renders TextOnly', () => {
    render(<TaskManager taskData={textOnlyData} />);
    const textOnlyElem = screen.getByTestId("text-only");
    expect(textOnlyElem).toBeInTheDocument();
})
const specOrderData = {
    type: "SpecifiedOrder",
    taskID: "SpecifiedOrder",
    possibleAnswers: ["1", "2", "3"]
};
it('renders SpecifiedOrder', () => {
    render(<TaskManager taskData={specOrderData} />);
    const specOrderElem = screen.getByTestId("spec-order");
    expect(specOrderElem).toBeInTheDocument();
})
const multChoiceData = {
    type: "MultipleChoice",
    taskID: "MultipleChoice",
    text: "MC",
    possibleAnswers: [{
        middleText: "1"
    }, {
        middleText: "2"
    }, {
        middleText: "3"
    }],
    correctAnswerIndex: 0
};
it('renders MultipleChoice', () => {
    render(<TaskManager taskData={multChoiceData} />);
    const multChoiceElem = screen.getByTestId("mult-choice");
    expect(multChoiceElem).toBeInTheDocument();
})
it('stays on same task after incorrect answer', async () => {
    render(<TaskManager taskData={multChoiceData} />);
    const incorrectAnswer = screen.getByText(/2/i);
    fireEvent.click(incorrectAnswer);
    const button = screen.getByRole("button", { name: /Check Answer/i })
    fireEvent.click(button);
    
    await waitFor(async () => {
        expect(screen.getByText(/MC/i)).toBeInTheDocument();
    });
})
it('handle bad taskdata', () => {
    render(<TaskManager taskData={{}} />);
    const errorElem = screen.getByText(/not found/i);
    expect(errorElem).toBeInTheDocument();
})