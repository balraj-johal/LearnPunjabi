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

    let initialState;
    props.isAuthenticated ? initialState = "Summary" : initialState = "Login";
    // if (props.overrideState) {
    //     initialState = props.overrideState;
    // }
    let [managerState, setManagerState] = useState(initialState);

    useEffect(() => {
        props.isAuthenticated ? setManagerState("Summary") : setManagerState("Login");
        // if (props.overrideState) {
        //     setManagerState(props.overrideState);
        // }
    }, [props.isAuthenticated])

    useEffect(() => {
        props.clearAuthErrors();
    }, [managerState])

    return(
        <div className="accounts-wrap">
            <div id="switcher-buttons">
                {props.isAuthenticated ? (
                    <>
                        <button onClick={() => {
                            props.logoutUser(props.auth.user._id);
                        }}>Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => {
                            setManagerState("Login")
                        }}>Login</button>
                        <button onClick={() => {
                            setManagerState("Register")
                        }}>Register</button>
                        {/* <button onClick={() => {
                            setManagerState("ForgotPassword")
                        }}>Forgot Password</button> */}
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
                // <Login setManagerState={props.setManagerState} />
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