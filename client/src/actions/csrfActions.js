//import declared action types
import {
    SET_READY,
} from "./types";

export const setCSRFReady = () => dispatch => {
    dispatch({
        type: SET_READY,
        payload: null
    })
}