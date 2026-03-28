/**
 * sanitize.js - Middleware de sanitización contra NoSQL Injection
 * 
 * Compatible con Express v5.
 * Recorre recursivamente req.body y elimina claves que empiecen con '$' o contengan '.'
 * para prevenir operadores de MongoDB maliciosos.
 */

/**
 * Limpia un objeto recursivamente, eliminando claves con operadores MongoDB
 * @param {*} obj - Valor a sanitizar
 * @returns {*} - Valor sanitizado
 */
const sanitizeValue = (obj) => {
    if (obj === null || obj === undefined) return obj;
    
    if (typeof obj === 'string') return obj;
    
    if (Array.isArray(obj)) {
        return obj.map(sanitizeValue);
    }
    
    if (typeof obj === 'object') {
        const clean = {};
        for (const key of Object.keys(obj)) {
            // Rechazar claves que empiecen con $ o contengan .
            if (key.startsWith('$') || key.includes('.')) {
                continue; // Eliminar la clave peligrosa
            }
            clean[key] = sanitizeValue(obj[key]);
        }
        return clean;
    }
    
    return obj;
};

/**
 * Middleware Express que sanitiza req.body y req.params
 */
const mongoSanitize = () => {
    return (req, res, next) => {
        if (req.body) {
            req.body = sanitizeValue(req.body);
        }
        if (req.params) {
            req.params = sanitizeValue(req.params);
        }
        next();
    };
};

module.exports = mongoSanitize;
