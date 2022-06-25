import {
    PLAY_AUDIO
} from "./types";

export const playAudio = value => dispatch => {
    dispatch({
        type: PLAY_AUDIO,
        payload: value
    })
}