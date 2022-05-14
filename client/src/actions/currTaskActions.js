//import declared action types
import {
    SET_ANIM_CLASSES
} from "./types";

export const setAnimClasses = value => dispatch => {
    dispatch({
        type: SET_ANIM_CLASSES,
        payload: value
    })
}