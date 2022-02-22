import axios from "axios";
import qs from 'qs';

//import declared action types
import {
    CLEAR_AUTH_ERRORS,
    SET_AUTH_ERRORS,
    SET_CURRENT_USER,
    SET_LOADED,
} from "./types";

export const clearAuthErrors = () => dispatch => {
    dispatch({
        type: CLEAR_AUTH_ERRORS,
        payload: null
    })
}

export const registerUser = userData => dispatch => {
    axios({
        method: 'post',
        url: "/api/users/register",
        data: qs.stringify(userData),
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    })
        .then(res => {
            console.log(res);
            alert("Register successful.");
        })
        .catch(err => {
            // TODO: Why is this log not running?
            console.log("post request errored, ");
            console.log("post request errored, ", err.response);
            dispatch({
                type: SET_AUTH_ERRORS,
                payload: err.response.data
            })
        })
}

export const loginUser = userData => dispatch => {
    console.log("login user auth action called, sending post req");
    //post user data
    axios({
        method: 'post',
        url: "/api/users/login",
        data: qs.stringify(userData),
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    })
        .then(res => {
            console.log("post request returned");
            getUserDataPromise()
                .then(userData => {
                    dispatch(setCurrentUser(userData));
                })
                .catch(err => {
                    dispatch({
                        type: SET_AUTH_ERRORS,
                        payload: err
                    })
                })
        })
        .catch(err => {
            console.log("post request errored, ", err.response);
            dispatch({
                type: SET_AUTH_ERRORS,
                payload: err.response.data
            })
        })
}

export const forgotPassword = userData => dispatch => {
    axios({
        method: 'post', url: "/api/users/forgot-password",
        data: qs.stringify(userData),
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    })
        .then(res => {
            console.log(res.data.code);
        })
        .catch(err => {
            console.log("post request errored, ", err.response);
            dispatch({
                type: SET_AUTH_ERRORS,
                payload: err.response.data
            })
        })
}
export const resetPassword = (userData) => dispatch => {
    console.log(userData)
    axios({
        method: 'post', url: `/api/users/reset-password/${userData.code}`,
        data: qs.stringify(userData),
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    })
        .then(res => {
            console.log("reset successful");
            console.log(res.data);
        })
        .catch(err => {
            console.log("post request errored, ", err.response);
            dispatch({
                type: SET_AUTH_ERRORS,
                payload: err.response.data
            })
        })
}


export const getUserDataPromise = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: "/api/users/data",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        })
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
        .then(userData => {
            dispatch(setCurrentUser(userData));
        })
        .catch(err => {
            console.log("get /users/data error: ", err)
        })
}

export const logoutUser = userID => dispatch => {
    //post user data
    axios({
        method: 'post',
        url: "/api/users/logout",
        data: qs.stringify({_id: userID}),
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    })
        .then(res => {
            dispatch(setCurrentUser({})); 
            window.localStorage.setItem("logout", Date.now());
        })
        .catch(err => {
            console.log("post /users/logout error: ", err);
        })
}

export const useRefreshToken = () => dispatch => {
    axios
        .post("/api/users/refreshToken", {},
            {
                withCredentials: true, 
                headers: { "Content-Type": "application/json" }
            }
        ) 
        .then(res => {
            console.log("token refresh successful!");
            getUserDataPromise()
                .then(userData => {
                    dispatch(setCurrentUser(userData));
                })
                .catch(err => {
                    console.log("post /users/refreshToken error: ", err);
                })
        })
        .catch(err => {
            console.log("Token refresh error: ", err);
            dispatch({
                type: SET_LOADED
            })
        })
}

export const setCurrentUser = decodedToken => {
    return {
      type: SET_CURRENT_USER,
      payload: decodedToken
    };
};