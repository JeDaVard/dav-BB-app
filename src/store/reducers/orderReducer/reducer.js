import * as actions from '../../actions/orderActions/types'

const initialState = {
    orders: [],
    error: null
};
export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_ORDERS:
            return {
                ...state,
                orders: action.orders,
                error: null
            };
        case actions.FETCH_ORDERS_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
}