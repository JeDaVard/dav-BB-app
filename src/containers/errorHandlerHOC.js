import React, { useState, useEffect } from 'react';
import Modal from '../components/UI/Modal/Modal';

const errorHandlerHOC = (WrappedComponent, axios) => props => {
    const [error, setError] = useState({ e: null });
    useEffect(() => {
        axios.interceptors.request.use(req => {
            setError({ e: null });
            return req;
        });
        axios.interceptors.response.use(res => res, e => {
            setError({ e });
        });
    });
    const errorDismiss = () => {
        setError({ e: null });
    };
    return (
        <>
            <Modal hidden={!error.e} modalClose={errorDismiss}>
                {error.e ? error.e.message : null}
            </Modal>
            <WrappedComponent {...props} />
        </>
    );
};

export default errorHandlerHOC;
