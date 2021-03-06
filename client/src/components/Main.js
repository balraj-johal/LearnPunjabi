import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axiosClient from "../axiosDefaults";

// import redux actions
import { getUserData, useRefreshToken } from "../actions/authActions";
import { setCSRFReady } from "../actions/csrfActions";
import { setMobile, setSingleVH } from "../actions/displayActions";

// component imports
import InternalPage from "../components/InternalPage";
import Dashboard from '../components/Dashboard';
import AccountManager from '../components/AccountManagement/AccountManager';
import Lesson from '../components/CourseComponents/Lesson';
import ProtectByRole from "./ProtectByRole";
import ResetPassword from "./AccountManagement/ResetPassword";
import VerifyEmail from "./VerifyEmail";
import Welcome from "./Welcome/Welcome";
import EditOverview from "./Editing/Overview/EditOverview";
import EditLesson from "./Editing/Lesson/EditLesson";
import NotAuthorised from "./NotAuthorised";
import PageNotFound from "./PageNotFound";
import FooterPage from "./Welcome/FooterPages/FooterPage";

function Main(props) {
    // fetch csrf token and store in redux reducer
    const { setCSRFReady } = props;
    useEffect(() => {
        axiosClient.get("/csrf-token")
            .then(res => {
                axiosClient.defaults.headers.common['X-CSRF-Token'] = res.data.token;
                setCSRFReady();
            })
            .catch(err => { console.log(err); })
    }, [setCSRFReady])

    // verify user credentials and refresh their refresh token
    let { csrf, auth } = props;
    useEffect(() => {
        let timeout;
        const verifyUser = () => {
            if (!csrf.ready) return timeout = setTimeout(() => {
                verifyUser() 
            }, 5 * 60 * 1000);
            props.useRefreshToken();
            timeout = setTimeout(() => { verifyUser() }, 5 * 60 * 1000);
        }
        verifyUser();

        return () => { clearTimeout(timeout) };
    }, [csrf.ready, auth.isAuthenticated, props.useRefreshToken]);
    
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
    
    // set up resize handlers
    const { setMobile } = props;
    useEffect(() => {
        let onResize = () => {
            if (window.innerWidth < 768) return setMobile(true);
            return setMobile(false);
        }
        onResize();
        window.addEventListener("resize", onResize);
        return () => { 
            window.removeEventListener("resize", onResize) 
        }
    }, [setMobile]);

    /** Assigns correct css class for site colour scheme
     *  @name colourScheme
     *  @returns {String} class to assign to site root
     */
    let colourScheme = () => {
        if (props.options.darkMode) return "darkMode";
        return "lightMode";
    }

    /** used to handle authenitcation redirects
     * @name authRedirects
     * @returns {Component} component used to either render internal page or redirect
     */
    let authRedirects = () => {
        if (props.auth.loading) return null;
        if (props.auth.isAuthenticated) return <InternalPage />;
        return <Navigate to="/welcome" replace />;
    }

    return(
        <div className={`${colourScheme()} max-h-full h-full
            ${props.options.dyslexiaFont ? "dyslexiaFont" : ""}`} 
        >
            <Router>
                <Routes>
                    <Route path="/" element={authRedirects()}>
                        <Route path="dashboard">
                            <Route path="" element={<Dashboard />} />
                            <Route path=":version" element={<Dashboard />} />
                        </Route> 
                        <Route path="lesson">
                            <Route path=":id" element={<Lesson />} />
                        </Route>
                        <Route path="restricted" element={<NotAuthorised />} />
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="edit">
                            <Route path="" element={
                                <ProtectByRole 
                                    component={<EditOverview />} 
                                    role={"Admin"} 
                                />
                            } />
                            <Route path=":id" element={
                                <ProtectByRole 
                                    component={<EditLesson />} 
                                    role={"Admin"} 
                                />
                            } />
                        </Route>
                    </Route>
                    <Route path="welcome" >
                        <Route path="" element={
                            <Welcome loginQueried={props.csrf} />
                        } />
                        <Route path="about" element={
                            <FooterPage for="About" />
                        } />
                        <Route path="privacy" element={
                            <FooterPage for="Privacy And Terms"  />
                        } />
                        <Route path="attributions" element={
                            <FooterPage for="Attributions"  />
                        } />
                    </Route>
                    <Route path="account" element={<InternalPage />}>
                        <Route path="" element={<AccountManager />} />
                        <Route path="reset-password/:code" element={<ResetPassword />} />
                        <Route path="verify-email/:code" element={<VerifyEmail />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
    csrf: state.csrf,
    options: state.options
});

export default connect(
    mapStateToProps,
    {
        getUserData,
        useRefreshToken,
        setCSRFReady,
        setMobile,
        setSingleVH
    }
)(Main);