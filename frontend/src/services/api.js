/**
 * api.js - Instancia base de Axios
 * 
 * ¿Qué hace?
 * Crea una instancia de Axios con la URL base del backend configurada.
 * Así no repetimos la URL en cada servicio.
 * 
 * ¿Por qué?
 * Si mañana la URL del backend cambia (ej: se sube a producción),
 * solo se modifica aquí y todos los servicios se actualizan automáticamente.
 */
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api'
});

export default api;
