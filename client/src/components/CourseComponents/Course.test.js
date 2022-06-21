import { render, screen, waitFor } from '../../utils/testing';
import { MemoryRouter } from 'react-router-dom';
import { rest } from "msw";
import { setupServer } from "msw/node";

import Course from './Course';

const LESSON_OVERVIEW = [
    {
        name: "lesson 1",
        id: "lesson-lesson 1",
        requiredCompletions: 1
    },
    {
        name: "lesson 2",
        id: "lesson-lesson 2",
        requiredCompletions: 2
    },
]

function MockRouterWrap({ children, ...props }) {
    return(
        <MemoryRouter>
            { children }
        </MemoryRouter> 
    )
}

// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/api/v1/lessons/', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(
            ctx.json({ overview: LESSON_OVERVIEW }), 
            ctx.delay(150)
        )
    }),
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

it('correctly fetches lessons', async () => {
    render(
        <MockRouterWrap>
            <Course showParticles={false} />
        </MockRouterWrap>
    )
    // wait for data to be fetched
    await waitFor(() => {
        expect(screen.getByText(/lesson 1/i)).toBeInTheDocument()
    });
})

it('renders the right amount of lesson icons', async () => {
    render(
        <MockRouterWrap>
            <Course showParticles={false} />
        </MockRouterWrap>
    )
    // wait for data to be fetched
    await waitFor(() => {
        expect(screen.getAllByRole("link").length).toBe(2);
    });
})

it('handles loading failure', async () => {
    // override server with failing route
    server.use(
        rest.get('/api/v1/lessons/', (req, res, ctx) => {
            return res(
                ctx.status(500),
                ctx.json({ error: "failure" }), 
                ctx.delay(150)
            )
        })
    )

    render(
        <MockRouterWrap>
            <Course showParticles={false} />
        </MockRouterWrap>
    )
    // wait for data to be fetched
    await waitFor(() => {
        expect(screen.getByText(/Loading failed./i)).toBeInTheDocument();
    });
})

it('handles loading failure', async () => {
    // override server with failing route
    server.use(
        rest.get('/api/v1/lessons/', (req, res, ctx) => {
            return res(
                ctx.status(500),
                ctx.json({ error: "failure" }), 
                ctx.delay(150)
            )
        })
    )

    render(
        <MockRouterWrap>
            <Course showParticles={false} />
        </MockRouterWrap>
    )
    // wait for data to be fetched
    await waitFor(() => {
        expect(screen.getByText(/Loading failed./i)).toBeInTheDocument();
    });
})