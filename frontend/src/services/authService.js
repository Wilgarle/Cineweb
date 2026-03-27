import api from './api';

const ENDPOINT = '/auth';

const login = (credenciales) => api.post(`${ENDPOINT}/login`, credenciales);

const register = (datosUsuario) => api.post(`${ENDPOINT}/register`, datosUsuario);

export default { login, register };
