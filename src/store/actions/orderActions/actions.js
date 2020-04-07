import * as actions from './types'
import axios from "../../../axios-orders";


// Fetch orders action
const setFetchOrders = orders => ({
    type: actions.FETCH_ORDERS,
    orders
});
const setFetchOrdersError = error => ({
    type: actions.FETCH_ORDERS_ERROR,
    error
});
export const fetchOrders = (token) => (
    async dispatch => {
        try {
            const { data } = await axios.get(`/orders.json?auth=${token}`);
            const orders = [];
            for (let order in data) {
                orders.push({
                    ...data[order],
                    id: order
                })
            }
            dispatch(setFetchOrders(orders))
        } catch (error) {
            dispatch(setFetchOrdersError('Oops... Something went wrong.'))
        }
    }
);

// Purchases
const setPurchaseSuccess = (id, order) => ({
    type: actions.PURCHASE_SUCCESS,
    id,
    order
});
const setPurchaseFailed = error => ({
    type: actions.PURCHASE_FAILED,
    error
});
export const purchase = (order, token) => (
    async dispatch => {
        try {
            const res = await axios.post('/orders.json?auth=' + token, order);

            dispatch(setPurchaseSuccess(res.data.name, order));
        } catch (e) {
            dispatch(setPurchaseFailed('Oops... Order failed, please, try again'))
        }
    }
);