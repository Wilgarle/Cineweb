const Tipo = require('../models/Tipo');
const { request, response } = require('express');

// Obtener todos los tipos
const getTipos = async (req = request, res = response) => {
    try {
        const tipos = await Tipo.find();
        res.status(200).json(tipos);
    } catch (error) {
        console.error('Error al obtener los tipos:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los tipos' });
    }
};

// Obtener un tipo por ID
const getTipoById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findById(id);
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        res.status(200).json(tipo);
    } catch (error) {
        console.error('Error al obtener el tipo:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener el tipo' });
    }
};

// Crear un nuevo tipo
const createTipo = async (req = request, res = response) => {
    try {
        const { nombre } = req.body;
        // Verificar si el tipo ya existe
        const tipoDB = await Tipo.findOne({ nombre });
        if (tipoDB) {
            return res.status(400).json({ msg: `El tipo ${nombre} ya existe` });
        }

        const tipo = new Tipo(req.body);
        await tipo.save();
        res.status(201).json(tipo);

    } catch (error) {
        console.error('Error al crear el tipo:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el tipo' });
    }
};

// Actualizar un tipo
const updateTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findById(id);
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }

        const { nombre, descripcion } = req.body;
        tipo.nombre = nombre || tipo.nombre;
        tipo.descripcion = descripcion || tipo.descripcion;
        tipo.fechaActualizacion = Date.now();

        const tipoActualizado = await tipo.save();
        res.status(200).json(tipoActualizado);
    } catch (error) {
        console.error('Error al actualizar el tipo:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el tipo' });
    }
};

// Eliminar un tipo
const deleteTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findByIdAndDelete(id);
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        res.status(200).json({ msg: 'Tipo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el tipo:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar el tipo' });
    }
};

module.exports = {
    getTipos,
    getTipoById,
    createTipo,
    updateTipo,
    deleteTipo
};
