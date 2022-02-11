import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

import { connect } from "react-redux";

import {
    logoutUser,
    getUserData
} from "../actions/authActions";

function AccountManager(props) {
    let [managerState, setManagerState] = useState("Login");

    return(
        <div id="accounts-wrap">
            <div id="switcher-buttons">
                <button onClick={() => {
                    setManagerState("Login")
                }}>Login</button>
                <button onClick={() => {
                    setManagerState("Register")
                }}>Register</button>
                <button onClick={() => {
                    props.logoutUser(props.auth.user._id);
                }}>Logout</button>
                <button onClick={() => {
                    props.getUserData();
                }}>Get User Data</button>
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
        default:
            return(
                <></>
            )
    }
}

//pull relevant props from redux state
const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {
        logoutUser,
        getUserData
    }
)(AccountManager);