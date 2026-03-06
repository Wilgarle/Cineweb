const Genero = require('../models/Genero');
const { request, response } = require('express');

// Obtener todos los géneros
const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        console.error('Error al obtener los géneros:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los géneros' });
    }
};

// Obtener un género por ID
const getGeneroById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findById(id);
        if (!genero) {
            return res.status(404).json({ msg: 'Género no encontrado' });
        }
        res.status(200).json(genero);
    } catch (error) {
        console.error('Error al obtener el género:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener el género' });
    }
};

// Crear un nuevo género
const createGenero = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;
        // Verificar si el género ya existe en la base de datos
        const generoDB = await Genero.findOne({ nombre });
        if (generoDB) {
            return res.status(400).json({ msg: `El género ${nombre} ya existe` });
        }

        const genero = new Genero({ nombre, descripcion });
        await genero.save();
        res.status(201).json(genero);

    } catch (error) {
        console.error('Error al crear el género:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el género' });
    }
};

// Actualizar un género
const updateGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findById(id);
        if (!genero) {
            return res.status(404).json({ msg: 'Género no encontrado' });
        }

        const { nombre, estado, descripcion } = req.body;
        genero.nombre = nombre || genero.nombre;
        genero.estado = estado || genero.estado;
        genero.descripcion = descripcion || genero.descripcion;
        genero.fechaActualizacion = Date.now();

        const generoActualizado = await genero.save();
        res.status(200).json(generoActualizado);
    } catch (error) {
        console.error('Error al actualizar el género:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el género' });
    }
};

// Eliminar un género
const deleteGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByIdAndDelete(id);
        if (!genero) {
            return res.status(404).json({ msg: 'Género no encontrado' });
        }
        res.status(200).json({ msg: 'Género eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el género:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar el género' });
    }
};

module.exports = {
    getGeneros,
    getGeneroById,
    createGenero,
    updateGenero,
    deleteGenero
};
