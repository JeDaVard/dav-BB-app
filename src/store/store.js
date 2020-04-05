import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import bbReducer from './reducers/bbReducer/reducer';
import orderReducer from './reducers/orderReducer/reducer'
import thunk from 'redux-thunk';

const reducers = combineReducers({
    bb: bbReducer,
    orders: orderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));