import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";
import csrfReducer from "./csrfReducer";

/*
    reducer defines how to change the state after each
    action (basically just switch case statements), combining
    all these here into the rootReducer is good for some reason! 
*/
const appReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    csrf: csrfReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;