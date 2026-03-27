/**
 * migrarSeriales.js - Script de migración única
 * 
 * Asigna seriales automáticos (PEL-XXXX / SER-XXXX) a las medias
 * existentes en la base de datos que aún no tengan el formato correcto.
 * 
 * Uso: node scripts/migrarSeriales.js
 *      (ejecutar una sola vez desde la carpeta backend)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Media = require('../models/Media');
const Tipo = require('../models/Tipo');

const PREFIJOS_POR_TIPO = {
    'Película': 'PEL',
    'Serie': 'SER'
};

const ejecutarMigracion = async () => {
    try {
        // Conectar a MongoDB usando la misma URI del .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado a MongoDB para migración');

        // Obtener todas las medias con su tipo poblado
        const medias = await Media.find().populate('tipo');

        if (medias.length === 0) {
            console.log('ℹ️  No hay medias para migrar.');
            process.exit(0);
        }

        // Contadores por prefijo para mantener la secuencia
        const contadores = {};

        // Ordenar por fechaCreacion para respetar el orden cronológico
        medias.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));

        let mediasActualizadas = 0;

        for (const media of medias) {
            const nombreTipo = media.tipo?.nombre;
            const prefijo = PREFIJOS_POR_TIPO[nombreTipo];

            if (!prefijo) {
                console.warn(`⚠️  Media "${media.titulo}" tiene tipo "${nombreTipo}" sin prefijo mapeado. Saltando.`);
                continue;
            }

            // Verificar si ya tiene el formato correcto
            const formatoCorrecto = new RegExp(`^${prefijo}-\\d{4}$`);
            if (formatoCorrecto.test(media.serial)) {
                console.log(`✔️  "${media.titulo}" ya tiene serial correcto: ${media.serial}`);
                continue;
            }

            // Inicializar contador si no existe
            if (!contadores[prefijo]) {
                contadores[prefijo] = 0;
            }
            contadores[prefijo]++;

            const nuevoSerial = `${prefijo}-${String(contadores[prefijo]).padStart(4, '0')}`;

            console.log(`🔄 "${media.titulo}": ${media.serial || '(sin serial)'} → ${nuevoSerial}`);

            media.serial = nuevoSerial;
            media.fechaActualizacion = Date.now();
            await media.save();
            mediasActualizadas++;
        }

        console.log(`\n✅ Migración completada. ${mediasActualizadas} media(s) actualizada(s).`);
        process.exit(0);

    } catch (error) {
        console.error('❌ Error durante la migración:', error.message);
        process.exit(1);
    }
};

ejecutarMigracion();
