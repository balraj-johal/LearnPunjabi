import { render, screen, fireEvent, waitFor } from '../../../../utils/testing';
import MultipleChoice from './MultipleChoice';

/**
 * MultipleChoice
 */

const testData = {
    text: "beebadoobie",
    image: null,
    possibleAnswers: [
        { middleText: "1" },
        { middleText: "2" },
        { middleText: "3" },
    ],
    correctAnswerIndex: 0,
    audioLink: "testsrc.mp3"
}
const mockHandleCorrect = () => {

}
const mockHandleWrong = () => {

}

it('renders text correctly', () => {
    render(<MultipleChoice data={testData} />);
    expect(screen.getByText(/beebadoobie/i)).toBeInTheDocument();
})
it('renders check answer button', () => {
    render(<MultipleChoice data={testData} />);
    const button = screen.getByRole("button", { name: /Check Answer/i })
    expect(button).toBeInTheDocument();
})
it('renders all options', () => {
    render(<MultipleChoice data={testData} />);
    testData.possibleAnswers.forEach(answer => {
        const answerElem = screen.getByText(RegExp(answer.middleText, "i"))
        expect(answerElem).toBeInTheDocument();
    })
})
it('renders audio element', () => {
    render(<MultipleChoice data={testData} />);
    expect(screen.getByRole("audio")).toBeInTheDocument();
})
it('does not render audio element when no link', () => {
    render(<MultipleChoice data={{...testData, audioLink: null}} />);
    expect(screen.queryByRole("audio")).toBe(null);
})
it('apply selected class on click', async () => {
    render(<MultipleChoice data={testData} />);
    const answer = screen.getByTestId("answer-0");
    fireEvent.click(answer);
    console.log(answer.classList)
    await waitFor(() => {
        expect(answer.classList.contains("chosen")).toBe(true);
    })
})
it('handles wrong answer correctly', async () => {
    render(<MultipleChoice data={testData} />);
    const answers = screen.getAllByRole("button");
    answers.forEach(answer => {
        expect(answer.classList.contains("chosen")).toBe(false);
    });
})
it('handles correct answer correctly', async () => {
    let correctlyAnswered = false;

    render(<MultipleChoice data={testData}
        handleCorrect={() => { correctlyAnswered = true }} />);

    let frag = screen.getByText(/1/i);
    fireEvent.click(frag);
    await waitFor(() => {
        const button = screen.getByRole("button", { name: /Check Answer/i });
        fireEvent.click(button);
    });
    await waitFor(() => {
        expect(correctlyAnswered).toBe(true);
    });
})