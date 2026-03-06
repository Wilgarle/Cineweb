const Director = require('../models/Director');
const { request, response } = require('express');

// Obtener todos los directores
const getDirectores = async (req = request, res = response) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        console.error('Error al obtener los directores:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los directores' });
    }
};

// Obtener un director por ID
const getDirectorById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const director = await Director.findById(id);
        if (!director) {
            return res.status(404).json({ msg: 'Director no encontrado' });
        }
        res.status(200).json(director);
    } catch (error) {
        console.error('Error al obtener el director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener el director' });
    }
};

// Crear un nuevo director
const createDirector = async (req = request, res = response) => {
    try {
        const { nombres } = req.body;
        // Verificar si el director ya existe
        const directorDB = await Director.findOne({ nombres });
        if (directorDB) {
            return res.status(400).json({ msg: `El director ${nombres} ya existe` });
        }

        const director = new Director(req.body);
        await director.save();
        res.status(201).json(director);

    } catch (error) {
        console.error('Error al crear el director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el director' });
    }
};

// Actualizar un director
const updateDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const director = await Director.findById(id);
        if (!director) {
            return res.status(404).json({ msg: 'Director no encontrado' });
        }

        const { nombres, estado } = req.body;
        director.nombres = nombres || director.nombres;
        director.estado = estado || director.estado;
        director.fechaActualizacion = Date.now();

        const directorActualizado = await director.save();
        res.status(200).json(directorActualizado);
    } catch (error) {
        console.error('Error al actualizar el director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el director' });
    }
};

// Eliminar un director
const deleteDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const director = await Director.findByIdAndDelete(id);
        if (!director) {
            return res.status(404).json({ msg: 'Director no encontrado' });
        }
        res.status(200).json({ msg: 'Director eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el director:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar el director' });
    }
};

module.exports = {
    getDirectores,
    getDirectorById,
    createDirector,
    updateDirector,
    deleteDirector
};
