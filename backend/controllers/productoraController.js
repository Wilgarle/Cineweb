const Productora = require('../models/Productora');
const { request, response } = require('express');

// Obtener todas las productoras
const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find();
        res.status(200).json(productoras);
    } catch (error) {
        console.error('Error al obtener las productoras:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar las productoras' });
    }
};

// Obtener una productora por ID
const getProductoraById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const productora = await Productora.findById(id);
        if (!productora) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }
        res.status(200).json(productora);
    } catch (error) {
        console.error('Error al obtener la productora:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener la productora' });
    }
};

// Crear una nueva productora
const createProductora = async (req = request, res = response) => {
    try {
        const { nombre } = req.body;
        // Verificar si la productora ya existe
        const productoraDB = await Productora.findOne({ nombre });
        if (productoraDB) {
            return res.status(400).json({ msg: `La productora ${nombre} ya existe` });
        }

        // Solo campos permitidos (previene mass assignment)
        const productora = new Productora({
            nombre,
            descripcion: req.body.descripcion || '',
            slogan: req.body.slogan || '',
            estado: req.body.estado || 'Activo'
        });
        await productora.save();
        res.status(201).json(productora);

    } catch (error) {
        console.error('Error al crear la productora:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear la productora' });
    }
};

// Actualizar una productora
const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const productora = await Productora.findById(id);
        if (!productora) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }

        const { nombre, estado, slogan, descripcion } = req.body;
        productora.nombre = nombre || productora.nombre;
        productora.estado = estado || productora.estado;
        productora.slogan = slogan || productora.slogan;
        productora.descripcion = descripcion || productora.descripcion;
        productora.fechaActualizacion = Date.now();

        const productoraActualizada = await productora.save();
        res.status(200).json(productoraActualizada);
    } catch (error) {
        console.error('Error al actualizar la productora:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar la productora' });
    }
};

// Eliminar una productora
const deleteProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const productora = await Productora.findByIdAndDelete(id);
        if (!productora) {
            return res.status(404).json({ msg: 'Productora no encontrada' });
        }
        res.status(200).json({ msg: 'Productora eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la productora:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar la productora' });
    }
};

module.exports = {
    getProductoras,
    getProductoraById,
    createProductora,
    updateProductora,
    deleteProductora
};
