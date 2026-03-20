/**
 * mediaService.js - Servicio para el módulo Media
 * 
 * Centraliza las llamadas HTTP al endpoint /media del backend.
 * Este es el módulo principal que relaciona géneros, directores,
 * productoras y tipos.
 */
import api from './api';

const ENDPOINT = '/media';

const getAll = () => api.get(ENDPOINT);

const getById = (id) => api.get(`${ENDPOINT}/${id}`);

const create = (data) => api.post(ENDPOINT, data);

const update = (id, data) => api.put(`${ENDPOINT}/${id}`, data);

const remove = (id) => api.delete(`${ENDPOINT}/${id}`);

export default { getAll, getById, create, update, remove };
