import { screen, render } from "../../utils/testing";
import Leaderboard from "./Leaderboard";

/** 
 * does show the correct amount of user entries
 * does handle 0 entries
*/

it('shows header', () => {
    render(<Leaderboard />);
    const header = screen.getByRole("heading", { name: /Leaderboard/i });
    expect(header).toBeInTheDocument();
})