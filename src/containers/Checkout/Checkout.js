import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

function Checkout(props) {
    const [state, setState] = useState({ ingredients: {}, totalPrice: 0 });
    useEffect(() => {
        const query = new URLSearchParams(props.location.search);

        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                totalPrice = param[1]
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        setState(state => ({ ...state, ingredients, totalPrice }));
    }, []);

    const checkoutCanceledHandler = () => {
        props.history.goBack();
    };
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    return (
        <div>
            <CheckoutSummary
                ingredients={state.ingredients}
                checkoutCanceled={checkoutCanceledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Route
                path={props.match.path + '/contact-data'}
                render={(props) => <ContactData ingredients={state.ingredients} totalPrice={state.totalPrice} {...props}/>}
            />
        </div>
    );
}

export default Checkout;
