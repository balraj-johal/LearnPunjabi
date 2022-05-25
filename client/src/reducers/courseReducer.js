import {
    SET_PROGRESS
} from "../actions/types";

const initialState = {
    progress: [],
};
  
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_PROGRESS:
            return {
                ...state,
                progress: [...action.payload]
            };
        default:
            return state;
    }
}