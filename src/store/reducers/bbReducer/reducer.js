import * as actionTypes from '../../actions/bbActions/types';

const initialState = {
    ingredients: null,
    purchasable: false,
    totalPrice: 4,
    loading: false,
    error: null,
};
const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 2,
    cheese: 2,
    meat: 5,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: null,
            };
        case actionTypes.FETCH_INGREDIENTS_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]:
                        state.ingredients[action.ingredient] + 1,
                },
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICE[action.ingredient],
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]:
                        state.ingredients[action.ingredient] - 1,
                },
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICE[action.ingredient],
            };
        default:
            return state;
    }
};
