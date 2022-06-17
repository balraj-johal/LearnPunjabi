import { render, screen } from '../../../utils/testing';
import Intersitial from './Intersitial';

const testData = {
    text: "beebadoobie"
}
let mockSubmit = () => {
}

it('renders text correctly', () => {
    render(<Intersitial data={testData} submit={mockSubmit} />);
    expect(screen.getByText(/beebadoobie/i)).toBeInTheDocument();
})

it('renders next button', () => {
    render(<Intersitial data={testData} submit={mockSubmit} />);
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
})