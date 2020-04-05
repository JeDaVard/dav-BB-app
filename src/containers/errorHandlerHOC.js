import React, { useState, useEffect } from 'react';
import Modal from '../components/UI/Modal/Modal';

const errorHandlerHOC = (WrappedComponent, axios) => props => {
    const [error, setError] = useState({ e: null });
    useEffect(() => {
        const interReq = axios.interceptors.request.use(req => {
            setError({ e: null });
            return req;
        }, e => {setError({ e })});
        return () => axios.interceptors.request.eject(interReq);
    }, []);
    useEffect(() => {
        const interRes = axios.interceptors.response.use(res => res, e => {
            setError({ e });
        });
        return () => axios.interceptors.response.eject(interRes);
    }, []);
    const errorDismiss = () => {
        setError({ e: null });
    };
    return (
        <>
            <Modal hidden={!error.e} modalClose={errorDismiss}>
                { error.e ? error.e.message : null }
            </Modal>
            <WrappedComponent {...props} />
        </>
    );
};

export default errorHandlerHOC;
