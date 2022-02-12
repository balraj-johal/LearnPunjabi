import React from "react";
import { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

// router imports
import { BrowserRouter as 
    Router,
    Route,
    Routes,
} from "react-router-dom";

// component imports
import Dashboard from '../components/Dashboard';
import AccountManager from '../components/AccountManager';
import Lessons from '../components/CourseComponents/Lessons';
import Lesson from '../components/CourseComponents/Lesson';
import Topbar from "./Topbar";

// auth actions
import {
    getUserData,
    useRefreshToken
} from "../actions/authActions";


function Main(props) {
    // verify user credentials and refresh their refresh token
    // TODO: determine why function executes twice
    const verifyUser = useCallback(async () => { 
        // TODO: fix this
        // set csurf protection header
        const { data } = await axios.get('/csrf-token');
        axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
        // refresh the jwt with the refresh token
        props.useRefreshToken();
        setTimeout(() => {
            verifyUser();
        }, 2.5 * 60 * 1000);
        // TODO: confirm that these dependancies are corrent
    }, [props.auth.isAuthenticated]); 
    useEffect(() => {
        verifyUser();
    }, [verifyUser])

    
    // synchronise logout across open tabs
    const syncLogout = useCallback(event => {
        if (event.key === "logout") {
            window.location.reload();
            }
    }, [])
    useEffect(() => {
        window.addEventListener("storage", syncLogout);
        return () => { window.removeEventListener("storage", syncLogout) };
    }, [syncLogout]);

    return(
        <Router>
            <Topbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/account" element={<AccountManager />} />
                    <Route path="/lesson" element={<Lessons />} >
                        <Route path=":id" element={<Lesson />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {
        getUserData,
        useRefreshToken
    }
)(Main);