import * as actions from '../../actions/orderActions/types';
import { LOG_OUT} from "../../actions/authActions/types";
import { updateObject } from "../unility";

const initialState = {
    orders: [],
    error: null
};

const fetchOrders = (state, action) => (
    updateObject(state, { orders: action.orders, error: null} )
);
const fetchOrdersError = (state, action) => (
    updateObject(state, { error: action.error } )
);
const purchaseSuccess = (state, action) => (
    updateObject(state, { orders: state.orders.concat({...action.order, id: action.id}), error: null} )
);
const purchaseFailed = (state, action) => (
    updateObject(state, { error: action.error } )
);
const logOut = (state) => (
    updateObject(state, {
        orders: []
    })
);

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_ORDERS: return fetchOrders(state, action);
        case actions.FETCH_ORDERS_ERROR: return fetchOrdersError(state, action);
        case actions.PURCHASE_SUCCESS: return purchaseSuccess(state, action);
        case actions.PURCHASE_FAILED: return purchaseFailed(state, action);
        case LOG_OUT: return logOut(state);
        default: return state
    }
}