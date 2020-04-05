import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinners/Spinner';
import errorHandlerHOC from "./errorHandlerHOC"
import * as actions from '../store/actions'


function BurgerBuilder(props) {
    const [state, setState] = useState({ purchasing: false });
    const { fetchIngredients, error} = props;

    useEffect(() => {
        fetchIngredients()
    }, [fetchIngredients, error]);

    const updatePurchasable = updatedIngredients => {
        const sum = Object.values(updatedIngredients).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return !!sum
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
        props.history.push('/checkout');
    };
    const disabledInfo = { ...props.ingredients };
    for (let key in disabledInfo)
        disabledInfo[key] = disabledInfo[key] <= 0;
    let orderSummary = null;

    let burger = error ? <p className={'tcenter'}>{error}</p> : <Spinner />;
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
    ingredients: state.bb.ingredients,
    totalPrice: state.bb.totalPrice,
    error: state.bb.error
});

const mapDispatchToProps = dispatch => ({
    addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    fetchIngredients: () => dispatch(actions.fetchIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandlerHOC(BurgerBuilder, axios));
