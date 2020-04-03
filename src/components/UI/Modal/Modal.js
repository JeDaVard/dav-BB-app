import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

function Modal (props) {
    return (
        <>
            <Backdrop order={!props.hidden} click={props.modalClose} />
            <div className={classes.Modal} hidden={props.hidden}>
                {props.children}
            </div>
        </>
    );
}

function noUpdate(p, n) {
    return (p.hidden === n.hidden) ? p.children === n.children : false;
}

export default React.memo(Modal, noUpdate);
