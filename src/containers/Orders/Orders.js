import React, {useEffect, useState} from "react";
import classes from './Orders.module.css'
import Order from "../../components/Order/Order";
import errorHandlerHOC from '../errorHandlerHOC'
import axios from '../../axios-orders'

function Orders() {
    const [state, setState] = useState({orders: [], loading: true});
    useEffect(() => {
        axios.get('/orders.json')
            .then(({data}) => {
                const orders = [];
                for (let order in data) {
                    orders.push({
                        ...data[order],
                        id: order
                    })
                }
                setState(state => ({ ...state, orders, loading: false}));
        })
            .catch( e => console.log(e))
    }, []);
    return (
        <div className={classes.Orders}>
            {state.orders.map((order) => {
                return <Order key={order.id} {...order} />
            }).reverse()}
        </div>
    )
}

export default errorHandlerHOC(Orders, axios)