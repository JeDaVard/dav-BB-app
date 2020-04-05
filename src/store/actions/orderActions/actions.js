import * as actions from './types'
import axios from "../../../axios-orders";


// Fetch orders action
export const setFetchOrders = orders => ({
    type: actions.FETCH_ORDERS,
    orders
});
export const setFetchOrdersError = error => ({
    type: actions.FETCH_ORDERS_ERROR,
    error
});
export const fetchOrders = () => (
    async dispatch => {
        try {
            const { data } = await axios.get('/orders.json');
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