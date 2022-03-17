import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// import redux actions
import { 
    logoutUser, 
    getUserData, 
    clearAuthErrors 
} from "../actions/authActions";

// import components
import Login from "./Login";
import Register from "./Register";
import AccountSummary from "./AccountSummary";
import ForgotPassword from "./ForgotPassword";

function AccountManager(props) {
    // initialise state
    let initialState;
    props.isAuthenticated ? initialState = "Summary" : initialState = "Login";
    let [managerState, setManagerState] = useState(initialState);

    // update state if user is logged in
    useEffect(() => {
        props.isAuthenticated ? setManagerState("Summary") : setManagerState("Login");
    }, [props.isAuthenticated]);

    // clear error messages when user switches between states
    useEffect(() => {
        props.clearAuthErrors();
    }, [managerState])

    return(
        <div className="accounts-wrap">
            <div id="switcher-buttons">
                {props.isAuthenticated ? (
                    <button onClick={() => {
                        props.logoutUser(props.auth.user._id);
                    }}>Logout</button>
                ) : (
                    <>
                        <button onClick={() => {
                            setManagerState("Login")
                        }}>Login</button>
                        <button onClick={() => {
                            setManagerState("Register")
                        }}>Register</button>
                    </>
                )}
            </div>
            <Switcher state={managerState} setManagerState={setManagerState} />
        </div>
    )
}

function Switcher(props) {
    switch (props.state) {
        case "Login":
            return(
                <Login setManagerState={props.setManagerState} />
            )
        case "Register":
            return(
                <Register setManagerState={props.setManagerState} />
            )
        case "ForgotPassword":
            return(
                <ForgotPassword setManagerState={props.setManagerState} />
            )
        case "Summary":
            return(
                <AccountSummary />
            )
        default:
            return(
                <></>
            )
    }
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps,
    {
        logoutUser,
        getUserData,
        clearAuthErrors
    }
)(AccountManager);