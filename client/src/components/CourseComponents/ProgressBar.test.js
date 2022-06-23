import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

/**
 * does it show the correct width of bar -- ADDE2E
 */


it('shows correct width at start', () => {
    render(<ProgressBar percent={0} />);

    const progressElem = screen.getByRole("progressbar");
    expect(progressElem).toBeInTheDocument();
    
    const barFillElem = screen.getByTestId("progressbar-fill");
    expect(barFillElem.style.width).toBe("0%");
})

it('shows correct width at random percent', () => {
    let rand = Math.random() * 100
    render(<ProgressBar percent={rand} />);

    const progressElem = screen.getByRole("progressbar");
    expect(progressElem).toBeInTheDocument();
    
    const barFillElem = screen.getByTestId("progressbar-fill");
    expect(barFillElem.style.width).toBe(`${rand}%`);
})