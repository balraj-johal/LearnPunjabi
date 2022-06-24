import { render, screen } from "../../utils/testing";
import FormSubmitButton from "./FormSubmitButton";

it('renders default text', () => {
    render(<FormSubmitButton for="default" />);
    screen.getByText(/default/i);
})
it('renders override text', () => {
    render(<FormSubmitButton for="default" text="override" />);
    screen.getByText(/override/i);
})