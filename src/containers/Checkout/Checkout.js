import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

function Checkout(props) {
    const checkoutCanceledHandler = () => {
        props.history.goBack();
    };
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    return (
        <div>
            <CheckoutSummary
                ingredients={props.ingredients}
                checkoutCanceled={checkoutCanceledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Route
                path={props.match.path + '/contact-data'}
                component={ContactData}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    ingredients: state.bb.ingredients
});

export default connect(mapStateToProps)(Checkout);
