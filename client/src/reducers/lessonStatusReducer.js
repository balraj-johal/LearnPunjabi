import {
    PLAY_AUDIO
} from "../actions/types";

const initialState = {
    playingAudio: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PLAY_AUDIO:
            return {
                ...state,
                playingAudio: action.payload
            };
        default:
            return state;
    }
}