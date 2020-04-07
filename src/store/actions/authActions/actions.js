import * as actions from './types';
import axios from 'axios';

const upAPI = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDA1hNT5ZLWg1pfyjtx1i61QekAHu_4Dug';
const inAPI = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDA1hNT5ZLWg1pfyjtx1i61QekAHu_4Dug';
// const getAPI = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDA1hNT5ZLWg1pfyjtx1i61QekAHu_4Dug';

const authStart = () => ({
    type: actions.AUTH_START
});

const authSuccess = (id, token) => ({
    type: actions.AUTH_SUCCESS,
    id,
    token
});

const authFailed = e => ({
    type: actions.AUTH_FAILED,
    e
});

const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000);
    };
};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actions.LOG_OUT,
    }
};

export const auth = (email, password, method) => (
    async dispatch => {
        try {
            dispatch(authStart());

            let authAPI = upAPI;
            if (method) authAPI = inAPI;
            const { data: {idToken, localId, expiresIn} } = await axios.post(authAPI, {email, password, returnSecureToken: true});

            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            localStorage.setItem('token', idToken);
            localStorage.setItem('expirationDate', expirationDate.toString());
            localStorage.setItem('userId', localId);

            dispatch(authSuccess(localId, idToken));
            dispatch(checkAuthTimeout(expiresIn))
        } catch (e) {
            dispatch(authFailed(`Oops.. Error, here's the message: ${e.response.data.error.message}`))
        }
    }
);

export const authRedirect = path => ({
    type: actions.AUTH_REDIRECT,
    path
});

export const checkAuth = () => (
    dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logOut());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(userId, token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
);