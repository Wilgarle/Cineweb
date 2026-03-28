/**
 * api.js - Instancia base de Axios con interceptor JWT
 * 
 * ¿Qué hace?
 * Crea una instancia de Axios con la URL base del backend configurada.
 * Incluye un interceptor que adjunta automáticamente el token JWT
 * en el header Authorization de cada petición.
 * 
 * ¿Por qué?
 * Si mañana la URL del backend cambia (ej: se sube a producción),
 * solo se modifica aquí y todos los servicios se actualizan automáticamente.
 */
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api'
});

// Interceptor: Adjuntar token JWT a cada petición automáticamente
api.interceptors.request.use(
    (config) => {
        const guardado = sessionStorage.getItem('cineweb_usuario');
        if (guardado) {
            const datos = JSON.parse(guardado);
            if (datos.token) {
                config.headers.Authorization = `Bearer ${datos.token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuesta: Si recibimos 401, limpiar sesión
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem('cineweb_usuario');
            // Solo redirigir si estamos en una ruta admin
            if (window.location.pathname.startsWith('/admin')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
