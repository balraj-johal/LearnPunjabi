import { render, screen, waitFor, fireEvent } from '../../utils/testing';
import { rest } from "msw";
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { setupServer } from "msw/node";

import Lesson from './Lesson';

const lessonDataTextOnly = {
    name: "test",
    shuffle: false,
    showInterstitials: true,
    showPercentCorrect: true,
    tasks: [
        {
            audio: {name: ""},
            audioFilename: "",
            taskID: "1",
            text: "LOREM IPSUM",
            type: "TextOnly",
        }, 
        {
            audio: {name: ""},
            audioFilename: "",
            taskID: "2",
            text: "TASK 2",
            type: "TextOnly",
        }, 
    ],
    id: "lesson-test",
    requiredCompletions: 75,
    noToSample: 0,
}

// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/api/v1/lessons/lesson-test', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(
            ctx.json(lessonDataTextOnly), 
            ctx.delay(150)
        )
    }),
    rest.put("/api/v1/users/progress/lesson-test", (req, res, ctx) => {
        return res(
            ctx.json(lessonDataTextOnly), 
            ctx.delay(150)
        )
    })
)
// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

it('handles load error correctly', async () => {
    // override server with failing route
    server.use(
        rest.get('/api/v1/lessons/lesson-test', (req, res, ctx) => {
            return res(
                ctx.status(500),
                ctx.json({ error: "failure" }), 
                ctx.delay(150)
            )
        })
    )

    render(
        <MemoryRouter initialEntries={["/lesson/lesson-test"]} >
            <Routes>
                <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
        </MemoryRouter>
    )
    // wait for data to be fetched
    await waitFor(() => {
        expect(screen.getByText(/Loading failed./i)).toBeInTheDocument();
    });
})

it('loads first task of lesson correctly', async () => {
    render(
        <MemoryRouter initialEntries={["/lesson/lesson-test"]} >
            <Routes>
                <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
        </MemoryRouter>
    )
    // wait for data to be fetched
    await waitFor(() => {
        expect(screen.getByText(/LOREM IPSUM/i)).toBeInTheDocument();
    });
})

it('shows progress bar', async () => {
    render(
        <MemoryRouter initialEntries={["/lesson/lesson-test"]} >
            <Routes>
                <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
        </MemoryRouter>
    )
    // wait for data to be fetched
    await waitFor(() => {
        const progressElem = screen.getByRole("progressbar");
        expect(progressElem).toBeInTheDocument();
    });
})

it('shows next button on TextOnly task', async () => {
    render(
        <MemoryRouter initialEntries={["/lesson/lesson-test"]} >
            <Routes>
                <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
        </MemoryRouter>
    )

    // wait for data to be fetched
    await waitFor(() => {
        const button = screen.getByRole("button", { name: /Next/i });
        expect(button).toBeInTheDocument();
    });
})

it('show next task after submit', async () => {
    render(
        <MemoryRouter initialEntries={["/lesson/lesson-test"]} >
            <Routes>
                <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
        </MemoryRouter>
    )

    // wait for data to be fetched
    await waitFor(async () => {
        const nextButton = screen.getByRole("button", { name: /Next/i });
        fireEvent.click(nextButton);
    });
    await waitFor(() => {
        expect(screen.getByText(/TASK 2/i)).toBeInTheDocument();
    });
})

it('handles lesson end correctly', async () => {
    render(
        <MemoryRouter initialEntries={["/lesson/lesson-test"]} >
            <Routes>
                <Route path="/dashboard" element={
                    <p>dashboard</p>
                } />
                <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
        </MemoryRouter>
    )
    // wait for data to be fetched
    await waitFor(async () => {
        const nextButton = screen.getByRole("button", { name: /Next/i });
        fireEvent.click(nextButton);
        console.log("click 1")
    });
    // wait for second task to be displayed
    await waitFor(async () => {
        expect(screen.getByText(/TASK 2/i)).toBeInTheDocument();
    });
    const nextButton = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextButton); 
    // check if end screen is shown
    await waitFor(async () => { 
        expect(screen.getByText(/your answers correct!/i)).toBeInTheDocument();
    });
    const finishButton = screen.getByRole("button", { name: /Finish/i });
    fireEvent.click(finishButton); 
    await waitFor(async () => { 
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
})

it('adds end task', async () => {
    render(
        <MemoryRouter initialEntries={["/lesson/lesson-test"]} >
            <Routes>
                <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
        </MemoryRouter>
    )
    // wait for data to be fetched
    await waitFor(async () => {
        const nextButton = screen.getByRole("button", { name: /Next/i });
        fireEvent.click(nextButton);
        console.log("click 1")
    });
    // wait for second task to be displayed
    await waitFor(async () => {
        expect(screen.getByText(/TASK 2/i)).toBeInTheDocument();
    });
    const nextButton = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextButton); 
    // check if end screen is shown
    await waitFor(async () => { 
        expect(screen.getByText(/your answers correct!/i)).toBeInTheDocument();
    });
})

it('calculate correct percentage at lesson end with no wrong answers', async () => {
    render(
        <MemoryRouter initialEntries={["/lesson/lesson-test"]} >
            <Routes>
                <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
        </MemoryRouter>
    )
    // wait for data to be fetched
    await waitFor(async () => {
        const nextButton = screen.getByRole("button", { name: /Next/i });
        fireEvent.click(nextButton);
        console.log("click 1")
    });
    // wait for second task to be displayed
    await waitFor(async () => {
        expect(screen.getByText(/TASK 2/i)).toBeInTheDocument();
    });
    const nextButton = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextButton); 
    // check if end screen is shown
    await waitFor(async () => { 
        expect(screen.getByText(/You got 100% of your answers correct!/i))
            .toBeInTheDocument();
    });
})


// it('adds interstitals', () => {

// })
// it('shuffles tasks', () => {

// })