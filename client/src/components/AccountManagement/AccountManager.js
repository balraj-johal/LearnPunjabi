import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// import redux actions
import { setDarkMode, setDyslexicOption } from "../../actions/optionsActions";
import { 
    logoutUser, 
    getUserData, 
    clearAuthErrors 
} from "../../actions/authActions";

// import components
import Login from "./Login";
import Register from "./Register";
import AccountTab from "./AccountTab";
import AccountSummary from "./AccountSummary";
import ForgotPassword from "./ForgotPassword";
import Settings from "./Settings";

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
        <div className="accounts-wrap animate-fade-in bg-white 
            shadow-xl z-50 text-black"
        >
            <div id="switcher-buttons" className="flex flex-row">
                {props.isAuthenticated ? (
                    <div className="w-full flex">
                        <AccountTab 
                            first={true} 
                            for="Summary" 
                            managerState={managerState} 
                            setManagerState={setManagerState} 
                        />
                        <AccountTab 
                            for="Settings" 
                            managerState={managerState} 
                            setManagerState={setManagerState} 
                        />
                    </div>
                ) : (
                    <div className="w-full flex">
                        <AccountTab 
                            first={true} 
                            for="Login" 
                            managerState={managerState} 
                            setManagerState={setManagerState} 
                        />
                        <AccountTab 
                            for="Register" 
                            managerState={managerState} 
                            setManagerState={setManagerState} 
                        />
                    </div>
                )}
            </div>
            <div className="account-switcher px-4 pb-5 pt-8 md:pt-5 
                h-full md:mt-0 mt-[-10px]"
            >
                <Switcher 
                    state={managerState} 
                    setManagerState={setManagerState} 
                    logoutUser={() => { props.logoutUser(props.auth.user._id) }} 
                />
            </div>
        </div>
    )
}

function Switcher(props) {
    switch (props.state) {
        case "Login":
            return <Login setManagerState={props.setManagerState} />
        case "Register":
            return <Register setManagerState={props.setManagerState} />
        case "ForgotPassword":
            return <ForgotPassword setManagerState={props.setManagerState} />
        case "Summary":
            return <AccountSummary logoutUser={props.logoutUser} />
        case "Settings":
            return <Settings />
        default:
            return null;
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
        clearAuthErrors,
        setDarkMode,
        setDyslexicOption
    }
)(AccountManager);