import React from 'react';
import classes from './Order.module.css';

export default function Order(props) {
    const ingredients = Object.entries(props.ingredients);
    return (
        <div className={classes.Order}>
            <div className={classes.top}>
                <div className={classes.date}>
                    <p>
                        Ordered:{' '}
                        {`${new Date(
                            props.date
                        ).toLocaleTimeString()} | ${new Date(
                            props.date
                        ).toLocaleDateString()}`}
                    </p>
                </div>
                <div className={classes.id}>
                    <p>ID: {props.id}</p>
                </div>
            </div>
            <div className={classes.body}>
                {ingredients.map(ig => {
                    return (
                        <div key={ig[0]} className={classes.ingredient}>
                            <div>
                                <p>{ig[0][0].toUpperCase() + ig[0].slice(1)}</p>
                            </div>
                            <div>
                                <p><b>{ig[1]}</b></p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={classes.bottom}>
                <p>Price: ${props.totalPrice}</p>
            </div>
        </div>
    );
}
