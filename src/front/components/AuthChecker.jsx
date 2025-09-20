import React, { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const AuthChecker = ({ children }) => {
    const { dispatch } = useGlobalReducer();

    useEffect(() => {
        dispatch({ type: 'check_auth' });
    }, [dispatch]);

    return children;
};