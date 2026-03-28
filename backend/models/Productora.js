const { Schema, model } = require('mongoose');

const ProductoraSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la productora es obligatorio'],
        unique: true,
        trim: true,
        maxlength: [200, 'Máximo 200 caracteres']
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    slogan: {
        type: String,
        trim: true,
        maxlength: [300, 'Máximo 300 caracteres']
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

module.exports = model('Productora', ProductoraSchema);
