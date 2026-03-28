/**
 * authMiddleware.js - Middleware de autenticación JWT
 * 
 * Verifica que el token JWT sea válido antes de permitir el acceso
 * a las rutas protegidas (CRUD de admin).
 */
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Obtener el token del header Authorization: Bearer <token>
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ msg: 'Acceso denegado. No se proporcionó token.' });
    }

    // Extraer token del formato "Bearer <token>"
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    if (!token) {
        return res.status(401).json({ msg: 'Acceso denegado. Token inválido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token inválido o expirado.' });
    }
};

/**
 * Middleware para verificar que el usuario tenga rol admin
 */
const verificarAdmin = (req, res, next) => {
    if (!req.usuario || req.usuario.rol !== 'admin') {
        return res.status(403).json({ msg: 'Acceso denegado. Se requiere rol de administrador.' });
    }
    next();
};

module.exports = { verificarToken, verificarAdmin };
