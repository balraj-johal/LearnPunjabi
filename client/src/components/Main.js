import React, { useCallback, useEffect, } from "react";
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
import { setMobile } from "../actions/displayActions";

// component imports
import InternalPage from "../components/InternalPage";
import Dashboard from '../components/Dashboard';
import AccountManager from '../components/AccountManagement/AccountManager';
import Lessons from '../components/CourseComponents/Lessons';
import Lesson from '../components/CourseComponents/Lesson';
import ProtectedComponent from "./ProtectedComponent";
import ResetPassword from "./AccountManagement/ResetPassword";
import VerifyEmail from "./VerifyEmail";
import Welcome from "./Welcome/Welcome";
import EditOverview from "./Editing/Overview/EditOverview";
import EditLesson from "./Editing/Lesson/EditLesson";
import NotAuthorised from "./NotAuthorised";
import PageNotFound from "./PageNotFound";

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
    const verifyUser = () => {
        if (!props.csrf.ready) return;
        props.useRefreshToken();
        setTimeout(() => { verifyUser() }, 5 * 60 * 1000);
    };
    useEffect(() => {
        verifyUser();
    }, [props.csrf.ready, props.auth.isAuthenticated]);
    
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
    useEffect(() => {
        let onResize = () => {
            if (window.innerWidth < 768) return props.setMobile(true);
            return props.setMobile(false);
        }
        onResize();
        window.addEventListener("resize", onResize);
        return () => { window.removeEventListener("resize", onResize) }
    }, []);

    return(
        <div className={`${props.options.dyslexiaFont ? "dyslexiaFont" : ""}
            ${props.options.darkMode ? "darkMode" : ""}
            max-h-full`} 
        >
            <Router>
                <Routes>
                    <Route path="/" element={ 
                        <Welcome loginQueried={props.csrf} /> 
                    } />
                    <Route path="/dashboard" element={
                        <InternalPage>
                            <ProtectedComponent component={<Dashboard />} />
                        </InternalPage>
                    } />
                    <Route path="/lesson" element={
                        <InternalPage>
                            <Lessons />
                        </InternalPage>
                    } >
                        <Route path=":id" element={
                            <ProtectedComponent component={<Lesson />} />
                        } />
                    </Route>                    
                    <Route path="/edit" >
                        <Route path="/edit/overview" element={
                            <InternalPage>
                                <ProtectedComponent 
                                    component={<EditOverview />} 
                                    role={"Admin"} 
                                />
                            </InternalPage>
                        } />
                        <Route path=":id" element={
                            <InternalPage>
                                <ProtectedComponent 
                                    component={<EditLesson />} 
                                    role={"Admin"} 
                                />
                            </InternalPage>
                        } />
                    </Route>
                    <Route path="/restricted" element={
                        <InternalPage>
                            <NotAuthorised />
                        </InternalPage>
                    } />
                    <Route path="/account" element={
                        <InternalPage>
                            <AccountManager />
                        </InternalPage>
                    } />
                    <Route path="/reset-password/:code" element={
                        <InternalPage>
                            <ResetPassword /> 
                        </InternalPage>
                    } />
                    <Route path="/verify-email/:code" element={
                        <InternalPage>
                            <VerifyEmail /> 
                        </InternalPage>
                    } />
                    <Route path="/welcome" element={
                        <InternalPage>
                            <Welcome /> 
                        </InternalPage>
                    } />
                    <Route path="*" element={
                        <InternalPage>
                            <PageNotFound /> 
                        </InternalPage>
                    } />
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
        setMobile
    }
)(Main);