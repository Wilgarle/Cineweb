/**
 * generoService.js - Servicio para el módulo Género
 * 
 * ¿Qué hace?
 * Centraliza todas las llamadas HTTP al endpoint /genero del backend.
 * Cada función corresponde a una operación CRUD.
 * 
 * ¿Por qué separarlo?
 * Para que los componentes (páginas) no se mezclen con la lógica HTTP.
 * Si el endpoint cambia, solo se modifica aquí.
 */
import api from './api';

const ENDPOINT = '/genero';

const getAll = () => api.get(ENDPOINT);

const getById = (id) => api.get(`${ENDPOINT}/${id}`);

const create = (data) => api.post(ENDPOINT, data);

const update = (id, data) => api.put(`${ENDPOINT}/${id}`, data);

const remove = (id) => api.delete(`${ENDPOINT}/${id}`);

export default { getAll, getById, create, update, remove };
