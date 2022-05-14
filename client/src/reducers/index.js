import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";
import csrfReducer from "./csrfReducer";
import optionsReducer from "./optionsReducer";
import displayReducer from "./displayReducer";
import currTaskReducer from "./currTaskReducer";

/*
    reducer defines how to change the state after each
    action (basically just switch case statements), combining
    all these here into the rootReducer is good for some reason! 
*/
const appReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    csrf: csrfReducer,
    options: optionsReducer,
    display: displayReducer,
    currTask: currTaskReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;