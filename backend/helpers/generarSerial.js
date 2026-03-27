/**
 * generarSerial.js - Genera un serial automático para cada Media
 * 
 * Formato: PEL-0001 (Película) o SER-0001 (Serie)
 * Se basa en el tipo seleccionado para determinar el prefijo
 * y busca el último serial existente para incrementar el contador.
 */
const Tipo = require('../models/Tipo');
const Media = require('../models/Media');

/**
 * Mapa de prefijos según el nombre del Tipo.
 * Solo se aceptan los valores exactos definidos en la BD.
 */
const PREFIJOS_POR_TIPO = {
    'Película': 'PEL',
    'Serie': 'SER'
};

/**
 * Genera un serial único e incremental basado en el tipo de media.
 * @param {string} tipoId - El ObjectId del Tipo seleccionado.
 * @returns {Promise<string>} - El serial generado (ej. 'PEL-0005').
 * @throws {Error} - Si el tipo no existe o no tiene un prefijo mapeado.
 */
const generarSerial = async (tipoId) => {
    try {
        // 1. Consultar el Tipo por su ID
        const tipoDB = await Tipo.findById(tipoId);
        if (!tipoDB) {
            throw new Error('El tipo especificado no existe');
        }

        // 2. Determinar el prefijo según el nombre del tipo
        const prefijo = PREFIJOS_POR_TIPO[tipoDB.nombre];
        if (!prefijo) {
            throw new Error(`No se encontró un prefijo para el tipo "${tipoDB.nombre}". Valores permitidos: ${Object.keys(PREFIJOS_POR_TIPO).join(', ')}`);
        }

        // 3. Buscar la última Media con ese prefijo (orden descendente)
        const ultimaMedia = await Media.findOne({
            serial: { $regex: `^${prefijo}-` }
        }).sort({ serial: -1 });

        // 4. Calcular el siguiente número
        let siguienteNumero = 1;
        if (ultimaMedia) {
            const partes = ultimaMedia.serial.split('-');
            const numeroActual = parseInt(partes[1], 10);
            if (!isNaN(numeroActual)) {
                siguienteNumero = numeroActual + 1;
            }
        }

        // 5. Formatear con zero-padding a 4 dígitos
        const serialGenerado = `${prefijo}-${String(siguienteNumero).padStart(4, '0')}`;

        return serialGenerado;

    } catch (error) {
        throw new Error(`Error al generar el serial: ${error.message}`);
    }
};

module.exports = generarSerial;
