import * as actionTypes from './types'
import axios from '../../../axios-orders'

// Fetch ingredients
export const setIngredients = ingredients => ({
    type: actionTypes.FETCH_INGREDIENTS,
    ingredients
});
export const setIngredientsError = error => ({
    type: actionTypes.FETCH_INGREDIENTS_ERROR,
    error
});
export const fetchIngredients = () => (
    async dispatch => {
        try {
            const res = await axios.get('/ingredients.json');
            const ingredientsOrder = ['salad', 'bacon', 'cheese', 'meat'];
            const ingredients = {};
            for (let i of ingredientsOrder) {
                ingredients[i] = res.data[i]
            }
            dispatch(setIngredients(ingredients))
        } catch (error) {
            dispatch(setIngredientsError('Oops... Something went wrong.'))
        }
    }
);

// Add ingredient action
export const addIngredient = ingredient => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredient
});

// Remove ingredient action
export const removeIngredient = ingredient => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient
});