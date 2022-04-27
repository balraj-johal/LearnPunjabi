import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main container', () => {
    render(<App />);
    const element = screen.getByRole("main");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("id", "custom-container");
});
