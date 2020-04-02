import React from "react";
import Button from "../../UI/Button/Button";
import classes from './OrderSummary.module.css'

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(item => {
            return <li key={item}>{item[0].toUpperCase() + item.slice(1)}: {props.ingredients[item]}</li>
        });
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h4>Total price: ${props.price.toFixed(2)}</h4>
            <p>Continue to checkpoint?</p>
            <div className={classes.Controls} >
                <Button action={props.cancel} btnType={'Danger'}>Cancel</Button>
                <Button action={props.continue} btnType={'Success'}>Continue</Button>
            </div>
        </>
    );
};

export default OrderSummary