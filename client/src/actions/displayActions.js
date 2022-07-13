//import declared action types
import {
    SET_MOBILE,
    SET_TOPBAR_HEIGHT,
    SET_LESSON_WRAP_HEIGHT,
    SET_SINGLE_VH,
    SET_WELCOME_SCROLL_PROGRESS
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

export const setLessonWrapHeight = value => dispatch => {
    dispatch({
        type: SET_LESSON_WRAP_HEIGHT,
        payload: value
    })
}
export const setSingleVH = value => dispatch => {
    dispatch({
        type: SET_SINGLE_VH,
        payload: value
    })
}
export const setWelcomeScrollProgress = value => dispatch => {
    dispatch({
        type: SET_WELCOME_SCROLL_PROGRESS,
        payload: value
    })
}