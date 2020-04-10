import { put } from 'redux-saga/effects'
import * as actionTypes from '../actions/authActions/types'

export function* logOutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put({
        type: actionTypes.LOG_OUT_INITIATIVE,
    })
}