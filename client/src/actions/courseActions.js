import axios from "axios";
import qs from 'qs';

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