import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as 
    Router,
    Route,
    Routes,
} from "react-router-dom";
import axiosClient from "../axiosDefaults";

// import redux actions
import { getUserData, useRefreshToken } from "../actions/authActions";
import { setCSRFReady } from "../actions/csrfActions";

// component imports
import Dashboard from '../components/Dashboard';
import AccountManager from '../components/AccountManager';
import Lessons from '../components/CourseComponents/Lessons';
import Lesson from '../components/CourseComponents/Lesson';
import Topbar from "./Topbar";
import ProtectedComponent from "./ProtectedComponent";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";
import NotAuthorised from "./NotAuthorised";


function Main(props) {
    // fetch csrf token and store in redux reducer
    useEffect(() => {
        axiosClient.get("/csrf-token")
            .then(res => {
                axiosClient.defaults.headers.common['X-CSRF-Token'] = res.data.token;
                props.setCSRFReady();
            })
            .catch(err => { console.log(err); })
    }, [])

    // verify user credentials and refresh their refresh token
    // TODO: determine why function executes twice
    const verifyUser = useCallback(async () => {
        // refresh the jwt with the refresh token
        if (props.csrf.ready) {
            props.useRefreshToken();
            setTimeout(() => {
                verifyUser();
            }, 5 * 60 * 1000);
        }
    // TODO: confirm that these dependancies are correct
    }, [props.auth.isAuthenticated, props.csrf.ready]);
    useEffect(() => {
        verifyUser();
    }, [verifyUser])
    
    // synchronise logout across open tabs
    const synchLogout = useCallback(event => {
        if (event.key === "logout") {
            window.location.reload();
        }
    }, [])
    useEffect(() => {
        window.addEventListener("storage", synchLogout);
        return () => { window.removeEventListener("storage", synchLogout) };
    }, [synchLogout]);

    return(
        <Router>
            <Topbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={
                        <ProtectedComponent component={<Dashboard />} />
                    } />
                    <Route path="/lesson" element={<Lessons />} >
                        <Route path=":id" element={
                            <ProtectedComponent component={<Lesson />} />
                        } />
                    </Route>
                    <Route path="/account" element={<AccountManager />} />
                    <Route path="/reset-password/:code" element={ <ResetPassword /> } />
                    <Route path="/verify-email/:code" element={ <VerifyEmail /> } />
                </Routes>
            </div>
        </Router>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
    csrf: state.csrf
});

export default connect(
    mapStateToProps,
    {
        getUserData,
        useRefreshToken,
        setCSRFReady
    }
)(Main);