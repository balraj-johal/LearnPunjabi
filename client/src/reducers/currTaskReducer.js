import {
    SET_ANIM_CLASSES
} from "../actions/types";

const initialState = {
    animClasses: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ANIM_CLASSES:
            return {
                ...state,
                animClasses: action.payload
            };
        default:
            return state;
    }
}