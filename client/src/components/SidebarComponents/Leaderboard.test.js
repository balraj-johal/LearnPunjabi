import { screen, render } from "../../utils/testing";
import Leaderboard from "./Leaderboard";
import LeaderboardUI from "./LeaderboardUI";

it('shows header', () => {
    render(<Leaderboard />);
    const header = screen.getByRole("heading", { name: /Leaderboard/i });
    expect(header).toBeInTheDocument();
})

const mockData = [
    {
        username: "test1",
        weeklyXP: 0
    },
    {
        username: "test2",
        weeklyXP: 10
    },
]
it('shows the correct amount of user entries', () => {
    render(<LeaderboardUI data={mockData} />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(2);
})

it('handles 0 entries', () => {
    render(<LeaderboardUI data={[]} />);
    const items = screen.queryAllByRole("listitem");
    expect(items.length).toBe(0);
})