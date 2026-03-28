const { Schema, model } = require('mongoose');

const GeneroSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del género es obligatorio'],
        unique: true,
        trim: true,
        maxlength: [100, 'Máximo 100 caracteres']
    },
    estado: {
        type: String, 
        required: true,
        enum: ['Activo','Inactivo'],
        default: 'Activo'
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [500, 'Máximo 500 caracteres']
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

module.exports = model('Genero', GeneroSchema);
