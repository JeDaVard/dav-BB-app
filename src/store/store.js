import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import bbReducer from './reducers/bbReducer/reducer';
import orderReducer from './reducers/orderReducer/reducer'
import thunk from 'redux-thunk';
import authReducer from "./reducers/authReducer/authReducer";
import apis from '../config/apis'
import createSagaMiddleware from 'redux-saga'
// import { watchAuth } from './sagas/index'

const reducers = combineReducers({
    bb: bbReducer,
    orders: orderReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = apis.reduxDev || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

// sagaMiddleware.run(watchAuth)

export default store