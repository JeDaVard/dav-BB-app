import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Orders.module.css';
import Order from '../../components/Order/Order';
import errorHandlerHOC from '../errorHandlerHOC';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinners/Spinner';
import { Link } from 'react-router-dom';

function Orders(props) {
    const [state, setState] = useState({ orders: [], loading: false });
    const { fetchOrders, error, token } = props;

    useEffect(() => {
        setState(state => ({ ...state, loading: true }));

        fetchOrders(token).then(() =>
            setState(state => ({ ...state, loading: false }))
        );
    }, [fetchOrders, error, token]);

    const orderList = props.orders.length ? (
        props.orders
            .map(order => {
                return <Order key={order.id} {...order} />;
            })
            .reverse()
    ) : (
        <div className={'tcenter'}>
            You can <Link to={'/'}>build your burger</Link> anytime :)
        </div>
    );

    return (
        <div className={classes.Orders}>
            {state.loading ? <Spinner /> : orderList}
            {error && <p className={'tcenter'}>Oops... Something went wrong</p>}
        </div>
    );
}

const mapStateToProps = state => ({
    orders: state.orders.orders,
    error: state.orders.error,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: token => dispatch(actions.fetchOrders(token)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(errorHandlerHOC(Orders, axios));
