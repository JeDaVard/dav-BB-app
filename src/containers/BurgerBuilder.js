import React from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 2,
    cheese: 2,
    meat: 5,
};

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    };

    updatePurchasable = updatedIngredients => {
        const sum = Object.values(updatedIngredients).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({ purchasable: !!sum });
    };
    addIngredientHandler = type => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = this.state.ingredients[type] + 1;

        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        });

        this.updatePurchasable(updatedIngredients);
    };
    removeIngredientHandler = type => {
        if (this.state.ingredients[type] <= 0) return;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = this.state.ingredients[type] - 1;

        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        });

        this.updatePurchasable(updatedIngredients);
    };
    purchaseHandler() {
        this.setState({ purchasing: true });
    }
    modalClose = () => {
        this.setState({ purchasing: false });
    };
    order = () => {};

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;

        return (
            <>
                <Modal
                    hidden={!this.state.purchasing}
                    modalClose={this.modalClose}
                >
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancel={this.modalClose}
                        continue={this.order}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    more={this.addIngredientHandler}
                    less={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    order={this.purchaseHandler.bind(this)}
                />
            </>
        );
    }
}

export default BurgerBuilder;
