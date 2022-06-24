import { MemoryRouter } from "react-router-dom";
import { render, screen } from "../utils/testing";
import InternalPage from "./InternalPage";

it('renders topbar', () => {
    render(
        <MemoryRouter>
            <InternalPage />
        </MemoryRouter>
    );

    const topbarElem =  screen.getByRole('navigation');
    expect(topbarElem).toBeInTheDocument();
})