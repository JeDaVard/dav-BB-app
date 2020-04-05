import * as actionTypes from '../../actions/bbActions/types';
import { updateObject } from '../unility';

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

const fetchIngredients = (state, action) => (
    updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: null,
    })
);
const fetchIngredientsError = (state, action) => (
    updateObject(state, { error: action.error })
);
const addIngredient = (state, action) => {
    const newIncrState = {
        ingredients: {
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        totalPrice:
            state.totalPrice + INGREDIENT_PRICE[action.ingredient],
    };
    return updateObject(state, { ...newIncrState })
};
const removeIngredient = (state, action) => {
    const newIncrState = {
        ingredients: {
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        totalPrice:
            state.totalPrice - INGREDIENT_PRICE[action.ingredient],
    };
    return updateObject(state, { ...newIncrState })
};



export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS: return fetchIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_ERROR: return fetchIngredientsError(state, action);
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        default: return state;
    }
};
