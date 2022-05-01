import {
    SET_MOBILE,
    SET_TOPBAR_HEIGHT
} from "../actions/types";

const initialState = {
    mobile: false,
    topbarHeight: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_MOBILE:
            return {
                ...state,
                mobile: action.payload
            };
        case SET_TOPBAR_HEIGHT:
            return {
                ...state,
                topbarHeight: action.payload
            };
        default:
            return state;
    }
}