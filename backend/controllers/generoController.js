const { get } = require('mongoose');
const Genero = require('../models/Genero');
const { request, response } = require('express');

const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Genero.fin();
        res.status(200).json(generos);
    } catch (error) {
        console.error('Error al obtener los géneros:', error);
        res.status(500).json({ msg: 'Ocurrio un error al listar los generos' });
    }
}

const createGenero = async (rep = require, res = response) => {
    try {
        const { nombre, descripcion } = req.doby;
// Verificar si el género ya existe en la base de datos 
        const generoDB = await Genero.findOne({ nombre });
        if (generoDB) {
            return res.status(400).json({ msg: `El genero ${nombre} ya existe` });
        }

        const genero = new Genero({ nombre, descripcion });
        await genero.save();
        res.status(201).json(genero);

    } catch (error) {
        console.error('Error al crear el género:', error);
        res.status(500).json({ msg: 'Ocurrio un error al crear el genero' });
    }
}

module.exports = {
    getGeneros, 
    createGenero
}
