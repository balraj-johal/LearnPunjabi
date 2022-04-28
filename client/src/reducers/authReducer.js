import {
    CLEAR_AUTH_ERRORS,
    SET_AUTH_ERRORS, 
    SET_CURRENT_USER, 
    SET_HAS_CHECKED, 
    SET_LOADED
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: true,
    errors: {},
    hasChecked: false,
};
  
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false
            };
        case SET_LOADED:
            return {
                ...state,
                loading: false
            };
        case SET_AUTH_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        case SET_HAS_CHECKED:
            return {
                ...state,
                hasChecked: true
            };
        case CLEAR_AUTH_ERRORS:
            return {
                ...state,
                errors: {}
            };
        default:
            return state;
    }
}