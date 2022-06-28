import { render, screen } from "../../utils/testing";
import FormLabel from "./FormLabel";

it('renders override text', () => {
    render(<FormLabel 
        labelOverride="override" 
        for="testing" 
    />);
    const overrideTextElem = screen.queryByText(/override/i);
    expect(overrideTextElem).toBeInTheDocument();
    const defaultTextElem = screen.queryByText(/testing/i);
    expect(defaultTextElem).not.toBeInTheDocument();
})
it('renders text and adds spaces between words', () => {
    render(<FormLabel for="testFormatting" />);
    screen.getByText(/Test Formatting/i);
})