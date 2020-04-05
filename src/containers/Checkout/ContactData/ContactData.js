import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinners/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions'
import errorHandlerHOC from "../../errorHandlerHOC";
import axios from '../../../axios-orders'

function ContactData({ ingredients, totalPrice, history, purchase }) {
    if (totalPrice <= 4) history.push('/');
    const [state, setState] = useState({
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address',
                },
                value: '',
            },
            postal: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code',
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'standard', displayValue: 'Standard' },
                        { value: 'fast', displayValue: 'Fast' },
                    ],
                },
                value: '',
            },
        },
        loading: false,
    });

    const orderHandler = e => {
        e.preventDefault();

        setState(state => ({
            ...state,
            loading: true,
        }));

        const customer = {};
        for (let formElementIdentifier in state.orderForm) {
            customer[formElementIdentifier] = state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients,
            totalPrice,
            customer,
            date: Date.now(),
        };

        purchase(order).then(() => {
            setState(state => ({
                ...state,
                loading: false,
            }));
            history.push('/')
        })
    };

    const onChangeHandler = (e, ii ) => {
        const updatedForm = {
            ...state.orderForm
        };
        const updatedFormElement = {
            ...updatedForm[ii]
        };
        updatedFormElement.value = e.target.value;
        updatedForm[ii] = updatedFormElement;
        setState(state => ({
            ...state,
            orderForm: updatedForm
        }))
    };
    const formElementArray = [];
    for (let key in state.orderForm) {
        formElementArray.push({
            id: key,
            config: state.orderForm[key]
        })
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {state.loading ? (
                <Spinner />
            ) : (
                <form onSubmit={orderHandler}>
                    {formElementArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.elementConfig.value}
                            onChange={(e) => onChangeHandler(e, formElement.id)}
                            />
                    ))}
                    <Button btnType="Success" type={'submit'} >
                        Order
                    </Button>
                </form>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    ingredients: state.bb.ingredients,
    totalPrice: state.bb.totalPrice
});

const mapDispatchToProps = dispatch => ({
    purchase: order => dispatch(actions.purchase(order))
});

export default connect(mapStateToProps, mapDispatchToProps)(errorHandlerHOC(ContactData, axios))