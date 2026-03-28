/**
 * authController.js - Controlador de autenticación
 * 
 * Maneja el registro de usuarios y el login.
 * El usuario Admin se valida contra variables de entorno (.env).
 * Los usuarios normales se registran y almacenan en MongoDB.
 * Genera tokens JWT para sesiones autenticadas.
 */
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const { request, response } = require('express');

/**
 * Genera un token JWT con los datos del usuario.
 * @param {Object} payload - { id, nombre, email, rol }
 * @returns {string} Token firmado con expiración de 8 horas
 */
const generarToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
};

// Registrar un nuevo usuario
const registrarUsuario = async (req = request, res = response) => {
    try {
        const { nombre, email, password } = req.body;

        // Validar campos obligatorios
        if (!nombre || !email || !password) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        // Validar que sean strings (previene inyección de objetos)
        if (typeof nombre !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ msg: 'Los campos deben ser texto válido' });
        }

        // Validar longitud mínima de contraseña
        if (password.length < 6) {
            return res.status(400).json({ msg: 'La contraseña debe tener al menos 6 caracteres' });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: 'El formato del email no es válido' });
        }

        // Verificar si el email ya está registrado
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ msg: 'Este email ya está registrado' });
        }

        // Crear y guardar el nuevo usuario (solo campos permitidos)
        const nuevoUsuario = new Usuario({ nombre, email, password });
        await nuevoUsuario.save();

        res.status(201).json({
            msg: 'Usuario registrado correctamente',
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            }
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ msg: 'Error interno al registrar el usuario' });
    }
};

// Login de usuario
const loginUsuario = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;

        // Validar campos obligatorios
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email y contraseña son obligatorios' });
        }

        // Validar que sean strings (previene NoSQL injection con objetos)
        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ msg: 'Los campos deben ser texto válido' });
        }

        // Verificar si es el Admin (credenciales desde .env)
        const adminUser = process.env.ADMIN_USER;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email === adminUser && password === adminPassword) {
            const adminPayload = {
                id: 'admin',
                nombre: 'Administrador',
                email: adminUser,
                rol: 'admin'
            };
            const token = generarToken(adminPayload);

            return res.status(200).json({
                token,
                usuario: adminPayload
            });
        }

        // Buscar usuario normal en la BD (incluir password para comparar)
        const usuario = await Usuario.findOne({ email }).select('+password');
        if (!usuario) {
            return res.status(401).json({ msg: 'Credenciales incorrectas' });
        }

        // Comparar contraseña
        const isPasswordValid = await usuario.compararPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Credenciales incorrectas' });
        }

        const usuarioPayload = {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        };
        const token = generarToken(usuarioPayload);

        res.status(200).json({
            token,
            usuario: usuarioPayload
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ msg: 'Error interno al iniciar sesión' });
    }
};

module.exports = { registrarUsuario, loginUsuario };
