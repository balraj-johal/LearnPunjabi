import { render, screen } from '@testing-library/react';
import Footer from '../Welcome/Footer';

it('renders footer', () => {
    render(<Footer />);
    const element = screen.getByRole("footer");
    expect(element).toBeInTheDocument();
});

it('renders all links', () => {
    render(<Footer />);
    
    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink).toBeInTheDocument();
    const privacyLink = screen.getByRole("link", { name: "Privacy and Terms" });
    expect(privacyLink).toBeInTheDocument();
    const socialsLink = screen.getByRole("link", { name: "Socials" });
    expect(socialsLink).toBeInTheDocument();
    const attributionsLink = screen.getByRole("link", { name: "Attributions" });
    expect(attributionsLink).toBeInTheDocument();
});