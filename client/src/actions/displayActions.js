//import declared action types
import {
    SET_MOBILE,
    SET_TOPBAR_HEIGHT
} from "./types";

export const setMobile = value => dispatch => {
    dispatch({
        type: SET_MOBILE,
        payload: value
    })
}
export const setTopbarHeight = value => dispatch => {
    dispatch({
        type: SET_TOPBAR_HEIGHT,
        payload: value
    })
}