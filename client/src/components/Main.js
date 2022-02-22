import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as 
    Router,
    Route,
    Routes,
} from "react-router-dom";
import axios from "axios";

// import redux actions
import { getUserData, useRefreshToken } from "../actions/authActions";

// component imports
import Dashboard from '../components/Dashboard';
import AccountManager from '../components/AccountManager';
import Lessons from '../components/CourseComponents/Lessons';
import Lesson from '../components/CourseComponents/Lesson';
import Topbar from "./Topbar";
import ProtectedComponent from "./ProtectedComponent";
import ResetPassword from "./ResetPassword";


function Main(props) {
    let [csrfTokenReady, setCsrfTokenReady] = useState(false);

    useEffect(() => {
        axios.get("/csrf-token", {withCredentials: true})
            .then(res => {
                axios.defaults.headers.post['X-CSRF-Token'] = res.data.token;
                setCsrfTokenReady(true)
            })
            .catch(err => { console.log(err); })
    }, [])

    // verify user credentials and refresh their refresh token
    // TODO: determine why function executes twice
    const verifyUser = useCallback(async () => {
        // refresh the jwt with the refresh token
        if (csrfTokenReady) {
            props.useRefreshToken();
            setTimeout(() => {
                verifyUser();
            }, 5 * 60 * 1000);
        }
    // TODO: confirm that these dependancies are corrent
    }, [props.auth.isAuthenticated, csrfTokenReady]);
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
                    <Route path="/account" element={<AccountManager />} />
                    <Route path="/reset-password" element={ <ResetPassword /> } />
                    <Route path="/" element={
                        <ProtectedComponent component={<Dashboard />} />
                    } />
                    <Route path="/lesson" element={<Lessons />} >
                        <Route path=":id" element={
                            <ProtectedComponent component={<Lesson />} />
                        } />
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