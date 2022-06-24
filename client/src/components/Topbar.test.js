import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '../utils/testing';
import Topbar from "./Topbar";

it('renders link to account', async () => {
    render(
        <MemoryRouter initialEntries={["/dashboard"]}>
            <Routes>
                <Route path="/account" element={
                    <p>account</p>
                } />
            </Routes>
            <Topbar />
        </MemoryRouter>
    );
    const accountLink = screen.getByRole("link", { name: /account/i });
    fireEvent.click(accountLink);
    await waitFor(() => {
        const accountElem = screen.getByText(/account/i)
        expect(accountElem).toBeInTheDocument();
    })
})