import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Topbar from "./Topbar";

import { connect } from "react-redux";

import {
    logoutUser
} from "../actions/authActions";

function AccountManager(props) {
    let [managerState, setManagerState] = useState("Login");

    return(
        <div>
            <Topbar />
            <div id="accounts-wrap">
                <div id="switcher-buttons">
                    <button onClick={() => {
                        setManagerState("Login")
                    }}>Login</button>
                    <button onClick={() => {
                        setManagerState("Register")
                    }}>Register</button>
                    <button onClick={() => {
                        setManagerState("Register")
                    }}>Logout</button>
                </div>
                <Switcher state={managerState} setManagerState={setManagerState} />
            </div>

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
                <div id="switcher">
                </div>
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
        logoutUser
    }
)(AccountManager);