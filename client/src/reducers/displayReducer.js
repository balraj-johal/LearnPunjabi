import {
    SET_MOBILE,
    SET_TOPBAR_HEIGHT,
    SET_LESSON_WRAP_HEIGHT,
    SET_SINGLE_VH,
    SET_WELCOME_SCROLL_PROGRESS
} from "../actions/types";

const initialState = {
    mobile: false,
    mobileReady: false,
    topbarHeight: 0,
    lessonWrapHeight: "0px",
    singleVH: 0,
    welcomeScrollProgress: 0,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_MOBILE:
            return {
                ...state,
                mobile: action.payload,
                mobileReady: true
            };
        case SET_TOPBAR_HEIGHT:
            return {
                ...state,
                topbarHeight: action.payload
            };
        case SET_LESSON_WRAP_HEIGHT:
            return {
                ...state,
                lessonWrapHeight: action.payload
            };
        case SET_SINGLE_VH:
            return {
                ...state,
                singleVH: action.payload
            };
        case SET_WELCOME_SCROLL_PROGRESS:
            return {
                ...state,
                welcomeScrollProgress: action.payload
            };
        default:
            return state;
    }
}