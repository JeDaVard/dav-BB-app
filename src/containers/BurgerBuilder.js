import React, { useState, useEffect } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinners/Spinner';
import errorHandlerHOC from "./errorHandlerHOC";

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 2,
    cheese: 2,
    meat: 5,
};

function BurgerBuilder(props) {
    const [state, setState] = useState({
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    });

    useEffect(() => {
        axios.get('/ingredients.json')
            .then(({data}) => {
                const ingredientsOrder = ['salad', 'bacon', 'cheese', 'meat'];
                const ingredients = {};
                for (let i of ingredientsOrder) {
                   ingredients[i] = data[i]
                }
                setState(state => ({...state, ingredients}))
            })
            .catch((() => {
                setState((state) => ({
                    ...state,
                        error: 'Connection error: cannot load ingredients'
                }))
            }));
    }, []);

    const updatePurchasable = updatedIngredients => {
        const sum = Object.values(updatedIngredients).reduce((sum, el) => {
            return sum + el;
        }, 0);

        setState((state) => ({
            ...state,
            purchasable: !!sum
        }));
    };
    const addIngredientHandler = type => {
        const updatedIngredients = { ...state.ingredients };
        updatedIngredients[type] = state.ingredients[type] + 1;

        const updatedPrice = state.totalPrice + INGREDIENT_PRICE[type];

        setState((state) => ({
            ...state,
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        }));

        updatePurchasable(updatedIngredients);
    };
    const removeIngredientHandler = type => {
        if (state.ingredients[type] <= 0) return;
        const updatedIngredients = { ...state.ingredients };
        updatedIngredients[type] = state.ingredients[type] - 1;

        const updatedPrice = state.totalPrice - INGREDIENT_PRICE[type];

        setState((state) => ({
            ...state,
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        }));

        updatePurchasable(updatedIngredients);
    };
    const purchaseHandler = () => {
        setState((state) => ({
            ...state, purchasing: true }));
    };
    const modalClose = () => {
        setState((state) => ({
            ...state,purchasing: false }));
    };

    const order = () => {
        const queryParams = [];
        for (let i in state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(state.ingredients[i]) )
        }
        queryParams.push(`price=${state.totalPrice}`);
        const search = '?' + queryParams.join('&');
        props.history.push({
            pathname: '/checkout',
            search,

        });
    };
    const disabledInfo = { ...state.ingredients };
    for (let key in disabledInfo)
        disabledInfo[key] = disabledInfo[key] <= 0;
    let orderSummary = null;

    let burger = state.error ? <p className={'tcenter'}>{state.error}</p> : <Spinner />;
    if (state.ingredients) {
        burger = (
            <>
                <Burger ingredients={state.ingredients} />
                <BuildControls
                    price={state.totalPrice}
                    purchasable={state.purchasable}
                    more={addIngredientHandler}
                    less={removeIngredientHandler}
                    disabled={disabledInfo}
                    order={purchaseHandler}
                />
            </>
        );
        orderSummary = <OrderSummary
            ingredients={state.ingredients}
            cancel={modalClose}
            continue={order}
            price={state.totalPrice}
        />;
    }
    if (state.loading) {
        orderSummary = <Spinner />
    }
    return (
        <>
            <Modal
                hidden={!state.purchasing}
                modalClose={modalClose}
            >
                {orderSummary}
            </Modal>
            {burger}
        </>
    );
}

export default errorHandlerHOC(BurgerBuilder, axios);
