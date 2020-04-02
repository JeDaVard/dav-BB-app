import React from "react";
import classes from './Backdrop.module.css'

const Backdrop = props => (
    props.order ? <div className={classes.Backdrop} onClick={props.click}>&nbsp;</div> : null
);

export default Backdrop;