const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del tipo es obligatorio'],
        unique: true,
        trim: true,
        maxlength: [100, 'Máximo 100 caracteres']
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

module.exports = model('Tipo', TipoSchema);
