const { Schema, model } = require('mongoose');

const DirectorSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'El nombre del director es obligatorio'],
        trim: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
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

module.exports = model('Director', DirectorSchema);
