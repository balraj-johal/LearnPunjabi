import {
    SET_AUTH_ERRORS, 
    SET_CURRENT_USER, 
    USER_LOADING
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    errors: {}
};
  
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_AUTH_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        default:
            return state;
    }
}