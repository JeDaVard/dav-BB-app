import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinners/Spinner';

export default function ContactData({ ingredients, totalPrice, history }) {
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        addresses: {
            street: '',
            postalCode: '',
        },
        loading: false,
    });

    const orderHandler = e => {
        e.preventDefault();
        setCustomer(state => ({
            ...state,
            loading: true,
        }));
        const order = {
            ingredients,
            totalPrice,
            customer,
            date: Date.now()
        };
        axios
            .post('/orders.json', order)
            .then(() => {
                setCustomer(state => ({
                    ...state,
                    loading: false,
                }));
                history.push('/')
            })
            .catch(() => {
                setCustomer(state => ({
                    ...state,
                    loading: false,
                }));
            });
    };

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {customer.loading ? (
                <Spinner />
            ) : (
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Address" />
                    <input
                        type="text"
                        name="postal"
                        placeholder="Postal Code"
                    />
                    <Button btnType="Success" action={orderHandler}>
                        Order
                    </Button>
                </form>
            )}
        </div>
    );
}
