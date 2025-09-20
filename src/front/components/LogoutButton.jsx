import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import './logout-button.css';

export const LogoutButton = () => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const handleLogout = () => {
        // Disparar la acción de logout en el store global
        dispatch({ type: 'logout' });

        // Redirigir a la página principal
        navigate('/');
    };

    return (
        <button
            className="btn btn-outline-danger navbar-logout-btn"
            onClick={handleLogout}
        >
            <i className="fas fa-sign-out-alt me-2"></i>
            Logout
        </button>
    );
};

export default LogoutButton;