import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from './Modal.module.css';

const Modal = props => {
    return (
        <>
            <Backdrop order={!props.hidden} click={props.modalClose}/>
            <div className={classes.Modal} hidden={props.hidden}>
                {props.children}
            </div>
        </>
    )
};

export default Modal;