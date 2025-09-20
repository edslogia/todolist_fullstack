// Servicio centralizado para llamadas a la API
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!BASE_URL) {
    throw new Error("VITE_BACKEND_URL is not defined in .env file");
}

// Función para hacer peticiones genéricas
export async function apiFetch(endpoint, options = {}) {
    try {
        const response = await fetch(BASE_URL + endpoint, options);
        const data = await response.json();
        console.log(data)
        if (!response.ok) throw new Error(data.errors || 'Error en la petición');
        return data;
    } catch (error) {
        throw new Error(
            error.message || 'No se pudo conectar con el backend.'
        );
    }
}

export async function getHomeMessage() {
    return apiFetch('/home');
}

// Función para registrar usuario (signup)
export async function signupUser({ name, email, password }) {
    return apiFetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });
}

