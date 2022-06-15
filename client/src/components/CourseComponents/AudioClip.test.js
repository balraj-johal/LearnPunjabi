import { render, screen } from '@testing-library/react';
import AudioClip from './AudioClip';

/**
 * Audio Clip
 * 
 * does it set correct class on playing
 * does it play audio when clicked
 * does it restart audio when clicked
 * does it stop playing on end
*/

it("doesn't render when there's no audio to play", () => {
    render(<AudioClip />)
    const audioElem = screen.queryByRole("audio");
    expect(audioElem).toBe(null);
})

it("does render when there is audio to play", () => {
    render(<AudioClip src={"test"} />)
    const audioElem = screen.queryByRole("audio");
    expect(audioElem).toBeInTheDocument();
})

// it("plays audio when clicked")
// it("restarts audio when clicked")
// it("stops playing animations on audio end")