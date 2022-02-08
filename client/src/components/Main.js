import React from "react";
import { useCallback, useEffect } from "react";

import axios from "axios";
import { connect } from "react-redux";

// router imports
import { BrowserRouter as 
    Router,
    Route, 
    Routes, 
} from "react-router-dom";

// component imports
import Dashboard from '../components/Dashboard';
import AccountManager from '../components/AccountManager';

import {
    setToken,
    decodeJWTandSetUser,
    getUserData
} from "../actions/authActions";


function Main(props) {

    useEffect(() => {
        props.getUserData();    
    }, [props.auth])

    // verify user credentials and refresh their refresh token
    const verifyUser = useCallback(async () => { // TODO: determine why function executes twice
        const { data } = await axios.get('/csrf-token');
        // add token to HTTP request headers
        axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
        console.log("csrf token: ", data.csrfToken);

        axios
            .post(
                "http://localhost:3001/api/users/refreshToken",
                {},
                {
                    withCredentials: true, 
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            .then(res => {
                //retrieve and save jwtToken
                const {token} = res.data;
                console.log("token refresh successful!");
                setToken(token);
                props.decodeJWTandSetUser(token);
                
                // call refreshToken every 5 minutes to renew the authentication token.
                setTimeout(verifyUser, 5 * 60 * 1000)
            })
            .catch(err => {
                console.log("Token refresh error: ", err);
            })
    }, [props.auth.isAuthenticated]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser])

    return(
        <div id="redux-provider-wrap">
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/account" element={<AccountManager />} />
                </Routes>
            </Router>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {
        decodeJWTandSetUser,
        getUserData
    }
)(Main);