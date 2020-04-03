import React, { useState, useEffect } from 'react';
import Modal from '../components/UI/Modal/Modal';

const errorHandlerHOC = (WrappedComponent, axios) => props => {
    const [error, setError] = useState({ e: null });
    useEffect(() => {
        const interReq = axios.interceptors.request.use(req => {
            setError({ e: null });
            console.log('req req', req);
            return req;
        }, err => {
            console.log(err, 'in boundryrrrrrrrrrrrrrr')
        });
        return () => axios.interceptors.request.eject(interReq);
    }, []);
    useEffect(() => {
        const interRes = axios.interceptors.response.use(res => {
            console.log('resssssss', res)
        }, e => {
            console.log('eeeee', e);
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
