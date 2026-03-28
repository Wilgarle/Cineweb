const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: {
        type: String,
        unique: true,
        trim: true,
        maxlength: [20, 'Máximo 20 caracteres']
    },
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        maxlength: [300, 'Máximo 300 caracteres']
    },
    sinopsis: {
        type: String,
        trim: true,
        maxlength: [2000, 'Máximo 2000 caracteres']
    },
    url: {
        type: String,
        required: [true, 'La URL es obligatoria'],
        unique: true,
        trim: true
    },
    imagen: {
        type: String,
        trim: true
    },
    anioEstreno: {
        type: Number,
        required: [true, 'El año de estreno es obligatorio']
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: [true, 'El género es obligatorio']
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: [true, 'El director es obligatorio']
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: [true, 'La productora es obligatoria']
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: [true, 'El tipo es obligatorio']
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = model('Media', MediaSchema);
