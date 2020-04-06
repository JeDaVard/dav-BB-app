import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import bbReducer from './reducers/bbReducer/reducer';
import orderReducer from './reducers/orderReducer/reducer'
import thunk from 'redux-thunk';
import authReducer from "./reducers/authReducer/authReducer";

const reducers = combineReducers({
    bb: bbReducer,
    orders: orderReducer,
    auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));