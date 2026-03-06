const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');
const { request, response } = require('express');

// Obtener todas las medias (con populate)
const getMedias = async (req = request, res = response) => {
    try {
        const medias = await Media.find()
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');
        res.status(200).json(medias);
    } catch (error) {
        console.error('Error al obtener las medias:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar las medias' });
    }
};

// Obtener una media por ID (con populate)
const getMediaById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const media = await Media.findById(id)
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');
        if (!media) {
            return res.status(404).json({ msg: 'Media no encontrada' });
        }
        res.status(200).json(media);
    } catch (error) {
        console.error('Error al obtener la media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener la media' });
    }
};

// Crear una nueva media
const createMedia = async (req = request, res = response) => {
    try {
        const { serial, url, genero, director, productora, tipo } = req.body;

        // Verificar si el serial ya existe
        const mediaSerial = await Media.findOne({ serial });
        if (mediaSerial) {
            return res.status(400).json({ msg: `La media con serial ${serial} ya existe` });
        }

        // Verificar si la URL ya existe
        const mediaUrl = await Media.findOne({ url });
        if (mediaUrl) {
            return res.status(400).json({ msg: `La media con URL ${url} ya existe` });
        }

        // Validar que el género exista y esté activo
        const generoDB = await Genero.findById(genero);
        if (!generoDB) {
            return res.status(400).json({ msg: 'El género especificado no existe' });
        }
        if (generoDB.estado !== 'Activo') {
            return res.status(400).json({ msg: 'El género especificado no está activo' });
        }

        // Validar que el director exista y esté activo
        const directorDB = await Director.findById(director);
        if (!directorDB) {
            return res.status(400).json({ msg: 'El director especificado no existe' });
        }
        if (directorDB.estado !== 'Activo') {
            return res.status(400).json({ msg: 'El director especificado no está activo' });
        }

        // Validar que la productora exista y esté activa
        const productoraDB = await Productora.findById(productora);
        if (!productoraDB) {
            return res.status(400).json({ msg: 'La productora especificada no existe' });
        }
        if (productoraDB.estado !== 'Activo') {
            return res.status(400).json({ msg: 'La productora especificada no está activa' });
        }

        // Validar que el tipo exista
        const tipoDB = await Tipo.findById(tipo);
        if (!tipoDB) {
            return res.status(400).json({ msg: 'El tipo especificado no existe' });
        }

        const media = new Media(req.body);
        await media.save();
        res.status(201).json(media);

    } catch (error) {
        console.error('Error al crear la media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear la media' });
    }
};

// Actualizar una media
const updateMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const media = await Media.findById(id);
        if (!media) {
            return res.status(404).json({ msg: 'Media no encontrada' });
        }

        const { serial, titulo, sinopsis, url, imagen, anioEstreno, genero, director, productora, tipo } = req.body;

        // Si se actualiza el género, validar que esté activo
        if (genero) {
            const generoDB = await Genero.findById(genero);
            if (!generoDB) {
                return res.status(400).json({ msg: 'El género especificado no existe' });
            }
            if (generoDB.estado !== 'Activo') {
                return res.status(400).json({ msg: 'El género especificado no está activo' });
            }
            media.genero = genero;
        }

        // Si se actualiza el director, validar que esté activo
        if (director) {
            const directorDB = await Director.findById(director);
            if (!directorDB) {
                return res.status(400).json({ msg: 'El director especificado no existe' });
            }
            if (directorDB.estado !== 'Activo') {
                return res.status(400).json({ msg: 'El director especificado no está activo' });
            }
            media.director = director;
        }

        // Si se actualiza la productora, validar que esté activa
        if (productora) {
            const productoraDB = await Productora.findById(productora);
            if (!productoraDB) {
                return res.status(400).json({ msg: 'La productora especificada no existe' });
            }
            if (productoraDB.estado !== 'Activo') {
                return res.status(400).json({ msg: 'La productora especificada no está activa' });
            }
            media.productora = productora;
        }

        // Si se actualiza el tipo, validar que exista
        if (tipo) {
            const tipoDB = await Tipo.findById(tipo);
            if (!tipoDB) {
                return res.status(400).json({ msg: 'El tipo especificado no existe' });
            }
            media.tipo = tipo;
        }

        media.serial = serial || media.serial;
        media.titulo = titulo || media.titulo;
        media.sinopsis = sinopsis || media.sinopsis;
        media.url = url || media.url;
        media.imagen = imagen || media.imagen;
        media.anioEstreno = anioEstreno || media.anioEstreno;
        media.fechaActualizacion = Date.now();

        const mediaActualizada = await media.save();
        res.status(200).json(mediaActualizada);
    } catch (error) {
        console.error('Error al actualizar la media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar la media' });
    }
};

// Eliminar una media
const deleteMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const media = await Media.findByIdAndDelete(id);
        if (!media) {
            return res.status(404).json({ msg: 'Media no encontrada' });
        }
        res.status(200).json({ msg: 'Media eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar la media' });
    }
};

module.exports = {
    getMedias,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia
};
