//import declared action types
import {
    SET_PROGRESS,
} from "./types";

export const setProgress = (newProgressArray) => dispatch => {
    dispatch({
        type: SET_PROGRESS,
        payload: newProgressArray
    })
}