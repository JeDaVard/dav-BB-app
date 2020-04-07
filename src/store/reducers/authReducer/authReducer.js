import * as actionTypes from '../../actions/authActions/types'
import { updateObject } from "../unility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    authRedirectValue: '/',
    loading: false
};

const authStart = (state) => (
    updateObject(state, {
        error: null,
        loading:true
    })
);
const authSuccess = (state, action) => (
    updateObject(state, {
        userId: action.id,
        token: action.token,
        loading: false
    })
);
const authFailed = (state, action) => (
    updateObject(state, {
        loading: false,
        error: action.e
    })
);
const logOut = (state) => (
    updateObject(state, {
        token: null,
        userId: null,
        error: null,
    })
);

const authRedirect = (state, action) => (
    updateObject(state, {
        authRedirectValue: action.path
    })
);

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.LOG_OUT: return logOut(state);
        case actionTypes.AUTH_REDIRECT: return authRedirect(state, action);
        default: return state
    }
};

export default authReducer