import axiosClient from "../axiosDefaults";
import qs from 'qs';

//import declared action types
import {
    CLEAR_AUTH_ERRORS,
    SET_AUTH_ERRORS,
    SET_CURRENT_USER,
    SET_HAS_CHECKED,
    SET_LOADED,
} from "./types";

export const clearAuthErrors = () => dispatch => {
    dispatch({
        type: CLEAR_AUTH_ERRORS,
        payload: null
    })
}

export const registerUser = userData => dispatch => {
    axiosClient.post("/api/v1/users/", qs.stringify(userData))
        .then(res => {
            console.log(res);
            alert("Register successful.");
        })
        .catch(err => {
            console.log("register request errored, ", err.response);
            dispatch({
                type: SET_AUTH_ERRORS,
                payload: err.response.data
            })
        })
}

export const loginUser = userData => dispatch => {
    axiosClient.post("/api/v1/users/login", qs.stringify(userData))
        .then(res => {
            getUserDataPromise()
                .then(userData => { dispatch(setCurrentUser(userData)); })
                .catch(err => {
                    dispatch({
                        type: SET_AUTH_ERRORS,
                        payload: err
                    })
                })
        })
        .catch(err => {
            console.log("login request errored, ", err.response);
            dispatch({
                type: SET_AUTH_ERRORS,
                payload: err.response.data
            })
        })
}

export const setUser = () => async (dispatch) => {
    try {
        let userData = await getUserDataPromise();
        dispatch(setCurrentUser(userData));
    } catch (error) {
        dispatch({
            type: SET_AUTH_ERRORS,
            payload: error
        })
    }
}
export const setAuthErrors = errors => dispatch => {
    dispatch({
        type: SET_AUTH_ERRORS,
        payload: errors
    })
}

export const forgotPassword = userData => dispatch => {
    axiosClient.post("/api/v1/users/forgot-password", qs.stringify(userData))
        .then(res => { console.log(); })
        .catch(err => {
            dispatch({
                type: SET_AUTH_ERRORS,
                payload: err.response.data
            })
        })
}
export const resetPassword = (userData) => dispatch => {
    axiosClient.post(`/api/v1/users/reset-password/${userData.code}`, 
        qs.stringify(userData))
        .catch(err => {
            dispatch({
                type: SET_AUTH_ERRORS,
                payload: err.response.data
            })
        })
}


export const getUserDataPromise = () => {
    return new Promise((resolve, reject) => {
        axiosClient.get(`/api/v1/users/`)
            .then(res => {
                resolve(res.data.user);
            })
            .catch(err => {
                reject(err);
            })
    })
}
export const getUserData = () => dispatch => {
    getUserDataPromise()
        .then(userData => { dispatch(setCurrentUser(userData)); })
        .catch(err => { console.log("get /users/data error: ", err) })
}

export const logoutUser = userID => dispatch => {
    axiosClient.post(`/api/v1/users/logout`, qs.stringify({_id: userID}))
        .then(res => {
            dispatch(setCurrentUser({})); 
            window.localStorage.setItem("logout", Date.now());
        })
        .catch(err => { console.log("logout error: ", err); })
}

export const useRefreshToken = () => async (dispatch) => {
    try {
        await axiosClient.post(`/api/v1/users/refreshToken`, qs.stringify({}));
        let userData = await getUserDataPromise();
        dispatch(setCurrentUser(userData));
        dispatch({ type: SET_HAS_CHECKED });
    } catch (err) {
        dispatch({ type: SET_LOADED });
        dispatch({ type: SET_HAS_CHECKED });
    }
}

export const setCurrentUser = decodedToken => {
    return {
      type: SET_CURRENT_USER,
      payload: decodedToken
    };
};