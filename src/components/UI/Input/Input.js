import React from 'react';
import classes from './Input.module.css';

export default function Input(props) {
    let inputElement = null;

    if (props.elementType === 'select') {
        inputElement = (
            <select
                className={classes.InputElement}
                value={props.value}
                onChange={props.onChange}
            >
                {props.elementConfig.options.map(({value, displayValue}) => (
                    <option key={displayValue} value={value}>{displayValue}</option>
                ))}
            </select>
        );
    } else if (props.inputType === 'textarea') {
        inputElement = (
            <textare
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange}
            />
        );
    } else {
        inputElement = (
            <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange}
                autoComplete={'suggested: "current-password"'}
            />
        );
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}
