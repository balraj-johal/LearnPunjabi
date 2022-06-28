import { screen, render } from "../../utils/testing";
import UserEntry from "./UserEntry";

const mockUser = {
    username: "testusername",
    weeklyXP: 10
}

it('shows username', () => {
    render(<UserEntry user={mockUser} index={0} />)
    const username = screen.getByText(/testusername/i);
    expect(username).toBeInTheDocument();
})
it('shows correct XP', () => {
    render(<UserEntry user={mockUser} index={0} />)
    const xp = screen.getByText(/10/i);
    expect(xp).toBeInTheDocument();
})
it('shows correct podium icon - first place', () => {
    render(<UserEntry user={mockUser} index={0} />);
    const icon = screen.getByRole("img", { name: /First Place Medal/i });
    expect(icon).toBeInTheDocument();
})
it('shows correct podium icon - second place', () => {
    render(<UserEntry user={mockUser} index={1} />);
    const icon = screen.getByRole("img", { name: /Second Place Medal/i });
    expect(icon).toBeInTheDocument();
})
it('shows correct podium icon - third place', () => {
    render(<UserEntry user={mockUser} index={2} />);
    const icon = screen.getByRole("img", { name: /Third Place Medal/i });
    expect(icon).toBeInTheDocument();
})
it('shows correct podium icon - no icon', () => {
    render(<UserEntry user={mockUser} index={3} />);
    const icon = screen.queryByRole("img");
    expect(icon).toBe(null);
})