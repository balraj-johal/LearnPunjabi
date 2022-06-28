import { render, screen } from "../../utils/testing";
import AddButton from "./AddButton";

it('shows text when required', () => {
    render(<AddButton text="test" />);
    const buttonText = screen.getByText(/test/i);
    expect(buttonText).toBeInTheDocument();
})

it('does not show text when not required', () => {
    render(<AddButton />);
    const buttonText = screen.queryByText(/test/i);
    expect(buttonText).not.toBeInTheDocument();
})