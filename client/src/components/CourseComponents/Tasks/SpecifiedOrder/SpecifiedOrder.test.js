import { fireEvent, render, screen, waitFor, within } from '../../../../utils/testing';
import SpecifiedOrder from "./SpecifiedOrder";

const testData = {
    text: "beebadoobie",
    image: null,
    possibleAnswers: [
        { text: "1" },
        { text: "2" },
        { text: "3" },
    ],
    correctAnswer: "321",
    audioLink: "testsrc.mp3"
}

it('renders text correctly', () => {
    render(<SpecifiedOrder data={testData} />);
    expect(screen.getByText(/beebadoobie/i)).toBeInTheDocument();
})
it('renders check answer button', () => {
    render(<SpecifiedOrder data={testData} />);
    const button = screen.getByRole("button", { name: /Check Answer/i })
    expect(button).toBeInTheDocument();
})
it('renders all options', () => {
    render(<SpecifiedOrder data={testData} />);
    testData.possibleAnswers.forEach(answer => {
        const answerElem = screen.getByText(RegExp(answer.text, "i"))
        expect(answerElem).toBeInTheDocument();
    })
})

it('renders audio element', () => {
    render(<SpecifiedOrder data={testData} />);
    expect(screen.getByRole("audio")).toBeInTheDocument();
})
it('does not render audio element when no link', () => {
    render(<SpecifiedOrder data={{...testData, audioLink: null}} />);
    expect(screen.queryByRole("audio")).toBe(null);
})

it('add frag to answers correctly when clicked', async () => {
    render(<SpecifiedOrder data={{...testData, audioLink: null}} />);
    const frag = screen.getByText(/1/i);
    fireEvent.click(frag);
    const selectedAnswerList = screen.getByRole("list", { 
        name: /selected-answers/i
    });
    
    await waitFor(() => {
        const { getAllByTestId } = within(selectedAnswerList);
        const items = getAllByTestId("selected-frag");
        const itemNames = items.map(item => item.textContent);
        expect(itemNames).toEqual(["1"]);
    });
})
it('removes frag from answers correctly when clicked', async () => {
    render(<SpecifiedOrder data={{...testData, audioLink: null}} />);

    // add frag to selected answers
    const possibleFrag = screen.getByText(/1/i);
    fireEvent.click(possibleFrag);
    const selectedAnswerList = screen.getByRole("list", { 
        name: /selected-answers/i
    });
    // remove frag from selected answers
    const selectedFrag = screen.getByText(/1/i);
    fireEvent.click(selectedFrag);
    await waitFor(() => {
        const { queryAllByTestId } = within(selectedAnswerList);
        const items = queryAllByTestId("selected-frag");
        const itemNames = items.map(item => item.textContent);
        expect(itemNames).toEqual([]);
    });
})
it('handles wrong answer correctly', async () => {
    render(<SpecifiedOrder data={{...testData, audioLink: null}} />);
    const frag = screen.getByText(/1/i);
    fireEvent.click(frag);
    await waitFor(() => {
        const button = screen.getByRole("button", { name: /Check Answer/i });
        fireEvent.click(button);
    });
    await waitFor(() => {
        const selectedAnswerList = screen.getByRole("list", { 
            name: /selected-answers/i
        });
        const { queryAllByRole } = within(selectedAnswerList);
        const items = queryAllByRole("button");
        const itemNames = items.map(item => item.textContent);
        expect(itemNames).toEqual([]);
    });
})
it('handles correct answer correctly', async () => {
    let correctlyAnswered = false;

    render(<SpecifiedOrder data={{...testData, audioLink: null}} 
        handleCorrect={() => { correctlyAnswered = true }} />);

    let frag = screen.getByText(/3/i);
    fireEvent.click(frag);
    frag = screen.getByText(/2/i);
    fireEvent.click(frag);
    frag = screen.getByText(/1/i);
    fireEvent.click(frag);
    await waitFor(() => {
        const button = screen.getByRole("button", { name: /Check Answer/i });
        fireEvent.click(button);
    });
    await waitFor(() => {
        expect(correctlyAnswered).toBe(true);
    });
})