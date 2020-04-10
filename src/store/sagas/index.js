import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../actions/authActions/types'
import { logOutSaga } from "./auth";

export function* watchAuth() {
    yield takeEvery(actionTypes.LOG_OUT_INITIATIVE, logOutSaga)
}