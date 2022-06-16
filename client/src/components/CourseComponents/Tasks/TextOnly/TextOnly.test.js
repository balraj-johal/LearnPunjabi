import { render, screen } from '../../../../utils/testing';
import TextOnly from './TextOnly';

const testData = {
    text: "beebadoobie",
    audioLink: null,
    image: null,
}

it('renders text correctly', () => {
    render(<TextOnly data={testData} />);
    expect(screen.getByText(/beebadoobie/i)).toBeInTheDocument();
})

it('renders next button', () => {
    render(<TextOnly data={testData} />);
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
})

const testDataImage = {
    text: "beebadoobie",
    audioLink: null,
    image: "https://i.redd.it/5m5byah3vs591.jpg",
}
it('renders image', () => {
    render(<TextOnly data={testDataImage} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
})

const testDataAudio = {
    text: "beebadoobie",
    audioLink: "https://i.redd.it/5m5byah3vs591.jpg",
    image: null,
}
it('renders audio element', () => {
    render(<TextOnly data={testDataAudio} />);
    expect(screen.getByRole("audio")).toBeInTheDocument();
})

const testDataAudioAndImage = {
    text: "beebadoobie",
    audioLink: "https://i.redd.it/5m5byah3vs591.jpg",
    image: "https://i.redd.it/5m5byah3vs591.jpg",
}
it('prioritises audio element', () => {
    render(<TextOnly data={testDataAudioAndImage} />);
    expect(screen.getByRole("audio")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
})