/**
 * tipoService.js - Servicio para el módulo Tipo
 * 
 * Centraliza las llamadas HTTP al endpoint /tipo del backend.
 */
import api from './api';

const ENDPOINT = '/tipo';

const getAll = () => api.get(ENDPOINT);

const getById = (id) => api.get(`${ENDPOINT}/${id}`);

const create = (data) => api.post(ENDPOINT, data);

const update = (id, data) => api.put(`${ENDPOINT}/${id}`, data);

const remove = (id) => api.delete(`${ENDPOINT}/${id}`);

export default { getAll, getById, create, update, remove };
