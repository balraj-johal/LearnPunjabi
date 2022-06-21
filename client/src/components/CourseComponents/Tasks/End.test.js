import { render, screen } from '../../../utils/testing';
import End from './End';

const testData = {
    text: "beebadoobie",
    showPercentCorrect: true
}

it('renders text correctly', () => {
    render(<End data={testData} />);
    expect(screen.getByText(/beebadoobie/i)).toBeInTheDocument();
})
it('renders answer feedback', () => {
    render(<End data={testData} />);
    expect(screen.getByText(/answers correct/i)).toBeInTheDocument();
})

it('renders finish button', () => {
    render(<End data={testData} />);
    expect(screen.getByRole("button", { name: /Finish/i })).toBeInTheDocument();
})

it('hides finish button when required', () => {
    render(<End data={{ ...testData, hideButton: true }} />);
    expect(screen.queryByRole("button", { name: /Finish/i })).not.toBeInTheDocument();
})