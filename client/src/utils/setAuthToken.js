import axios from "axios";
import axiosClient from "../axiosDefaults";

const setAuthToken = token => {
    if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = token;
        axiosClient.defaults.headers.common["Authorization"] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
        delete axiosClient.defaults.headers.common["Authorization"];
    }
};
  
export default setAuthToken;