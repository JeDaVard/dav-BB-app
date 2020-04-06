import * as actions from './types';
import axios from 'axios';
const upAPI = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDA1hNT5ZLWg1pfyjtx1i61QekAHu_4Dug';
const inAPI = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDA1hNT5ZLWg1pfyjtx1i61QekAHu_4Dug';

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

export const logOut = () => ({
    type: actions.LOG_OUT,
});

export const auth = (email, password, method) => (
    async dispatch => {
        try {
            dispatch(authStart());

            let authAPI = upAPI;
            if (method) authAPI = inAPI;
            const res = await axios.post(authAPI, {email, password, returnSecureToken: true});

            dispatch(authSuccess(res.data.localId, res.data.idToken))
        } catch (e) {
            dispatch(authFailed(`Oops.. Error, here's the message: ${e.response.data.error.message}`))
        }
    }
);