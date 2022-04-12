import {
    SET_READY
} from "../actions/types";

const initialState = {
    ready: false,
};
  
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_READY:
            return {
                ...state,
                ready: true // array copied to ensure redux rerender
            };
        default:
            return state;
    }
}