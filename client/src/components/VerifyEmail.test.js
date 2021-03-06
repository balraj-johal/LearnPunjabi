/**
 * does redirect if code valid -- ADDE2E
*/
import { render, screen, waitFor } from '../utils/testing';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { rest } from "msw";
import { setupServer } from "msw/node";

import VerifyEmail from "./VerifyEmail";

// mock server routes
const server = setupServer(
    rest.put('/api/v1/users/verify-email/:verificationCode', (req, res, ctx) => {
        if (req.params.verificationCode === "1234a") {
            return res(
                ctx.json({ message: "successful verification!" }), 
                ctx.delay(150)
            )
        } else {
            return res(ctx.status(500), ctx.delay(150));
        }
    }),
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

it('shows success message for a valid code', async () => {
    render(
        <MemoryRouter initialEntries={["/account/verify-email/1234a"]} >
            <Routes>
                <Route path="/account/verify-email/:code" element={
                    <VerifyEmail />
                } />
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => {
        screen.getByText(/verification successful/i);
    })
})
it('shows login link for valid code', async () => {
    render(
        <MemoryRouter initialEntries={["/account/verify-email/1234a"]} >
            <Routes>
                <Route path="/account/verify-email/:code" element={
                    <VerifyEmail />
                } />
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => {
        screen.getByRole("link", {name: /login/i});
    }, { timeout: 5000 })
})
it('shows failure message for an invalid code', async () => {
    render(
        <MemoryRouter initialEntries={["/account/verify-email/wrong"]} >
            <Routes>
                <Route path="/account/verify-email/:code" element={
                    <VerifyEmail />
                } />
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => {
        screen.getByText(/verification unsuccessful/i);
    })
})