import axios from 'axios';
/**
 * Configuración dinámica de la URL del Backend:
 * - Si estás en Desarrollo (npm run dev): Usa localhost:4000
 * - Si estás en Producción (Vercel/Render): Usa tu URL de Render
 */
const baseURL = import.meta.env.MODE === 'development'
    ? 'http://localhost:4000/api'
    : 'https://cineweb-pqwq.onrender.com/api';
const api = axios.create({
    baseURL
});

// Interceptor: Adjuntar token JWT a cada petición automáticamente
api.interceptors.request.use(
    (config) => {
        const guardado = sessionStorage.getItem('cineweb_usuario');
        if (guardado) {
            const datos = JSON.parse(guardado);
            if (datos && datos.token) {
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
            if (window.location.pathname.startsWith('/admin')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
