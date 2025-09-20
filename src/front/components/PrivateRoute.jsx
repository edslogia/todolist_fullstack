import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    // Verificar si el usuario tiene un token válido
    const token = localStorage.getItem('access_token');

    // Función para verificar si el token está expirado
    const isTokenValid = () => {
        if (!token) return false;

        try {
            // Decodificar el token JWT para verificar la expiración
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000; // Tiempo actual en segundos

            // Verificar si el token ha expirado
            return tokenPayload.exp > currentTime;
        } catch (error) {
            console.error('Error al validar el token:', error);
            return false;
        }
    };

    // Si no hay token o está expirado, redirigir al login
    if (!token || !isTokenValid()) {
        // Limpiar el token inválido del localStorage
        localStorage.removeItem('access_token');
        return <Navigate to="/login" replace />;
    }

    // Si el token es válido, mostrar el componente hijo
    return children;
};