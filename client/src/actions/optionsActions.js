//import declared action types
import {
    SET_DARK_MODE,
    SET_DYSLEXIC_OPTION
} from "./types";

export const setDarkMode = value => dispatch => {
    window.localStorage.setItem("darkMode", value)
    dispatch({
        type: SET_DARK_MODE,
        payload: value
    })
}

export const setDyslexicOption = value => dispatch => {
    dispatch({
        type: SET_DYSLEXIC_OPTION,
        payload: value
    })
}