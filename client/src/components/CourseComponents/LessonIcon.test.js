import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LessonIcon from "./LessonIcon";

const MOCK_LESSON = {
      "name": "mock lesson",
      "id": "lesson-mock lesson",
      "requiredCompletions": 5,
      "tasksLength": 5
}

// test not run due to inability to assert animation start frame
// it('randomises water animation start', () => {
//     render(<LessonIcon timesCompleted={1} lesson={MOCK_LESSON} />)
// })

it('link to lesson works correctly', async () => {
    render(
        <MemoryRouter>
            <Routes>
                <Route path="/" element={
                    <LessonIcon timesCompleted={5} lesson={MOCK_LESSON} />
                }/>
                <Route path="/lesson/:id" element={<p>success</p>}/>
            </Routes>
        </MemoryRouter> 
    )

    const icon = screen.getByRole("link");

    fireEvent.click(icon);

    await waitFor(() => {
        expect(screen.getAllByText(/success/i)[0]).toContainHTML("<p>success</p>");
    });
})

it('shows icon with correct finished state', () => {
    render(<LessonIcon timesCompleted={5} lesson={MOCK_LESSON} />, 
        {wrapper: MemoryRouter});

    const icon = screen.getByRole("link");
    expect(icon.firstChild.classList.contains("bg-gold")).toBe(true);
    expect(icon.firstChild.classList.contains("bg-white")).toBe(false);
})

it('shows icon with correct unfinished state', () => {
    render(<LessonIcon timesCompleted={2} lesson={MOCK_LESSON} />, 
        {wrapper: MemoryRouter});

    const icon = screen.getByRole("link");
    expect(icon.firstChild.classList.contains("bg-gold")).toBe(false);
    expect(icon.firstChild.classList.contains("bg-white")).toBe(true);
})

it('says correct lesson name', () => {
    render(<LessonIcon timesCompleted={5} lesson={MOCK_LESSON} />, 
        {wrapper: MemoryRouter});
    
    const icon = screen.getByRole("link", { name: MOCK_LESSON.name });
    expect(icon).toBeInTheDocument();
})