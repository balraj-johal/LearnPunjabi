import {
    SET_MOBILE
} from "../actions/types";

const initialState = {
    mobile: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_MOBILE:
            return {
                ...state,
                mobile: action.payload
            };
        default:
            return state;
    }
}