import { screen, render } from "../utils/testing";
import GenericButton from "./GenericButton";

it('renders text', () => {
    render(<GenericButton text="test" />);
    screen.getByText(/test/i);
})