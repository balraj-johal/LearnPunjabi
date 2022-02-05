import './style/Root.css';

import { useCallback, useEffect } from "react";


// router imports
import { BrowserRouter as 
    Router,
    Route, 
    Routes, 
} from "react-router-dom";

import axios from "axios";

// redux imports
import { Provider } from "react-redux";
import store from "./store";

// component imports
import Dashboard from './components/Dashboard';
import AccountManager from './components/AccountManager';

import {
    setToken,
    setCurrentUser,
    decodeJWTandSetUser
} from "./actions/authActions";


function App() {
    // verify user credentials and refresh their refresh token
    const verifyUser = useCallback(() => {
        axios
            .post(
                "http://localhost:3001/api/users/refreshToken",
                {},
                {
                    withCredentials: true, 
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            .then(res => {
                //retrieve and save jwtToken
                const {token} = res.data;
                console.log("token refresh successful!");
                setToken(token);
                decodeJWTandSetUser(token); // TODO; fix this. redux actions can't be called from here so need to either move the call to a component in scope or move the action to here somehow
                
                // call refreshToken every 5 minutes to renew the authentication token.
                setTimeout(verifyUser, 5 * 60 * 1000)
            })
            .catch(err => {
                console.log("Token refresh error: ", err);
            })
    })

    useEffect(() => {
        verifyUser();
    }, [verifyUser])

    // on mount get valid csrf token
    useEffect(() => {
        const getCsrfToken = async () => {
            const { data } = await axios.get('/csrf-token');
            // add token to HTTP request headers
            axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
        };  
        
        getCsrfToken();
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/account" element={<AccountManager />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
