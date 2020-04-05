import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinners/Spinner';
import errorHandlerHOC from "./errorHandlerHOC"
import * as actionTypes from '../actions/types'


function BurgerBuilder(props) {
    const [state, setState] = useState({
        purchasing: false,
        loading: false,
        error: false
    });
    const updatePurchasable = updatedIngredients => {
        const sum = Object.values(updatedIngredients).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return !!sum
    };
    // useEffect(() => {
    //     axios.get('/ingredients.json')
    //         .then(({data}) => {
    //             const ingredientsOrder = ['salad', 'bacon', 'cheese', 'meat'];
    //             const ingredients = {};
    //             for (let i of ingredientsOrder) {
    //                ingredients[i] = data[i]
    //             }
    //             setState(state => ({...state, ingredients}))
    //         })
    //         .catch((() => {
    //             setState((state) => ({
    //                 ...state,
    //                     error: 'Connection error: cannot load ingredients'
    //             }))
    //         }));
    // }, []);

    const purchaseHandler = () => {
        setState((state) => ({
            ...state, purchasing: true }));
    };
    const modalClose = () => {
        setState((state) => ({
            ...state,purchasing: false }));
    };

    const order = () => {
        props.history.push('/checkout');
    };
    const disabledInfo = { ...props.ingredients };
    for (let key in disabledInfo)
        disabledInfo[key] = disabledInfo[key] <= 0;
    let orderSummary = null;

    let burger = state.error ? <p className={'tcenter'}>{state.error}</p> : <Spinner />;
    if (props.ingredients) {
        burger = (
            <>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    price={props.totalPrice}
                    purchasable={updatePurchasable(props.ingredients)}
                    more={props.addIngredient}
                    less={props.removeIngredient}
                    disabled={disabledInfo}
                    order={purchaseHandler}
                />
            </>
        );
        orderSummary = <OrderSummary
            ingredients={props.ingredients}
            cancel={modalClose}
            continue={order}
            price={props.totalPrice}
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

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
});

const mapDispatchToProps = dispatch => ({
    addIngredient: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient}),
    removeIngredient: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient}),
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandlerHOC(BurgerBuilder, axios));
