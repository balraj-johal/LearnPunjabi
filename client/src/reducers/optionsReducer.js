import {
    SET_DARK_MODE,
    SET_DYSLEXIC_OPTION
} from "../actions/types";

const initialState = {
    darkMode: false,
    dyslexiaFont: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload
            };
        case SET_DYSLEXIC_OPTION:
            return {
                ...state,
                dyslexiaFont: action.payload
            };
        default:
            return state;
    }
}