import { render, screen } from "../../utils/testing";
import FormError from "./FormError";

let mockErrors = {
    test: "success",
    other: "other"
}

it('shows correct error', () => {
    render(<FormError errors={mockErrors} for="test" />);
    const errorText = screen.getByText(/success/i);
    expect(errorText).toBeInTheDocument();
})
it('renders nothing if no applicable error', () => {
    render(<FormError errors={mockErrors} for="thirdchoice" />);
    const errorText = screen.queryByText(/success/i);
    expect(errorText).not.toBeInTheDocument();
})
it('handles bad error object', () => {
    render(<FormError errors={{}} for="test" />);
    const errorDiv = screen.getByRole("alert");
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv.innerText).toBe(undefined);
})