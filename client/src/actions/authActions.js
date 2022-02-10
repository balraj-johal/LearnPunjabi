import axios from "axios";
import qs from 'qs';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//import declared action types
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    SET_PROGRESS
} from "./types";

export const registerUser = (userData) => dispatch => {
    axios({
        method: 'post',
        url: "http://localhost:3001/api/users/register",
        data: qs.stringify(userData),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        withCredentials: true
    })
        .then(res => {
            console.log(res);
            alert("Register successful.");
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const loginUser = userData => dispatch => {
    //post user data
    axios({
        method: 'post',
        url: "http://localhost:3001/api/users/login",
        data: qs.stringify(userData),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        withCredentials: true
    })
        .then(res => {
            //retrieve and save jwtToken
            const {token} = res.data;
            alert("login successful");
            console.log("login successful: ", res.data)
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            //decode and set current user from token
            const decodedToken = jwt_decode(token);
            dispatch(setCurrentUser(decodedToken));
        })
        //if err dispatch GET_ERRORS with the error data
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: "sth else"
                })
            }
        })
}

export const getUserData = () => dispatch => {
    //post user data
    axios({
        method: 'get',
        url: "http://localhost:3001/api/users/data",
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        withCredentials: true
    })
        .then(res => {
            let userData = res.data.user
            console.log("user data: ", userData);
            dispatch({
                type: SET_PROGRESS,
                payload: userData.progress
            })
        })
        //if err dispatch GET_ERRORS with the error data
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: "sth else"
                })
            }
        })
}

let clearUserData = dispatch => {
    dispatch({
        type: SET_PROGRESS,
        payload: []
    })
}
export const logoutUser = userID => dispatch => {
    //post user data
    axios({
        method: 'post',
        url: "http://localhost:3001/api/users/logout",
        data: qs.stringify({_id: userID}),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        withCredentials: true
    })
        .then(res => {
            localStorage.removeItem("jwtToken");
            setAuthToken(false);
            //set current user to empty obj
            dispatch(setCurrentUser({}));
            clearUserData(dispatch);
            window.localStorage.setItem("logout", Date.now())
        })
        //if err dispatch GET_ERRORS with the error data
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            } else {
                dispatch({
                    type: GET_ERRORS,
                    payload: "sth else"
                })
            }
        })
}


export const decodeJWTandSetUser = token => dispatch => {
    const decodedToken = jwt_decode(token);
    dispatch(setCurrentUser(decodedToken));
}


export const setCurrentUser = decodedToken => {
    return {
      type: SET_CURRENT_USER,
      payload: decodedToken
    };
};

export const setToken = token => dispatch => {
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    //decode and set current user from token
    const decodedToken = jwt_decode(token);
    dispatch(setCurrentUser(decodedToken));
}