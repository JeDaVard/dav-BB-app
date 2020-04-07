import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

function BuildControls(props) {
    return (
        <div className={classes.BuildControls}>
            <div className={classes.Price}>
                {props.purchasable && (
                    <p>
                        Price: <b>${props.price.toFixed(2)}</b>
                    </p>
                )}
            </div>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    less={() => props.less(ctrl.type)}
                    more={() => props.more(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            <div>
                <button
                    className={classes.OrderButton}
                    onClick={props.order}
                    disabled={!props.purchasable}
                >
                    {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
                </button>
            </div>
        </div>
    );
}

export default BuildControls;
