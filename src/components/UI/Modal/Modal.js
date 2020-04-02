import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

function Modal (props) {
    console.log('updated');
    return (
        <>
            <Backdrop order={!props.hidden} click={props.modalClose} />
            <div className={classes.Modal} hidden={props.hidden}>
                {props.children}
            </div>
        </>
    );
}

function shouldUpdate(p, n) {
    return p.hidden === n.hidden
}

export default React.memo(Modal, shouldUpdate);
