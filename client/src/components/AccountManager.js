import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";

import { connect } from "react-redux";

import {
    logoutUser,
    getUserData
} from "../actions/authActions";

function AccountManager(props) {
    let initialState;
    props.isAuthenticated ? initialState = "Summary" : initialState = "Login";
    let [managerState, setManagerState] = useState(initialState);

    return(
        <div id="accounts-wrap">
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
                <Login />
            )
        case "Register":
            return(
                <Register setManagerState={props.setManagerState} />
            )
        case "Summary":
            return(
                <h2>Summary</h2>
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
        getUserData
    }
)(AccountManager);