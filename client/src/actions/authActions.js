import axios from "axios";
import qs from 'qs';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//import declared action types
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    RESTART
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
            // window.location.reload();
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

export const logoutUser = () => dispatch => {
    //post user data
    axios({
        method: 'get',
        url: "http://localhost:3001/api/users/logout",
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
    console.log("deeconed")
    const decodedToken = jwt_decode(token);
    dispatch(setCurrentUser(decodedToken));
}


export const setCurrentUser = decodedToken => {
    return {
      type: SET_CURRENT_USER,
      payload: decodedToken
    };
};
  
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const setToken = token => dispatch => {
    console.log("sett")
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    //decode and set current user from token
    const decodedToken = jwt_decode(token);
    dispatch(setCurrentUser(decodedToken));
}