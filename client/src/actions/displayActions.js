//import declared action types
import {
    SET_MOBILE,
} from "./types";

export const setMobile = value => dispatch => {
    dispatch({
        type: SET_MOBILE,
        payload: value
    })
}