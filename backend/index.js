require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const mongoSanitize = require('./middlewares/sanitize');

const { getConnection } = require('./db/db-connection-mongo');

const app = express();
const port = process.env.PORT || 4000;

// ============================================
// MIDDLEWARES DE SEGURIDAD
// ============================================

// 1. Helmet — Headers de seguridad (oculta X-Powered-By, agrega HSTS, etc.)
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' } // Para servir imágenes cross-origin
}));

// 2. CORS — Restringir orígenes permitidos
const corsOptions = {
    origin: [
        'http://localhost:5000',   // Frontend en desarrollo
        'http://localhost:5173',   // Vite default port
        'http://localhost:3000'    // Alternativo
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// 3. Body parser con límite de tamaño (previene payloads gigantes)
app.use(express.json({ limit: '10kb' }));

// 4. Sanitización contra NoSQL Injection (elimina operadores $ del body)
app.use(mongoSanitize());

// 5. Rate limiting global (100 peticiones por IP cada 15 min)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { msg: 'Demasiadas peticiones. Intenta de nuevo en 15 minutos.' }
});
app.use('/api', globalLimiter);

// 6. Rate limiting estricto para autenticación (10 intentos cada 15 min)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { msg: 'Demasiados intentos de autenticación. Intenta de nuevo en 15 minutos.' }
});

// Servir la carpeta de uploads de manera estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================
// RUTAS
// ============================================

// Auth — Con rate limiting estricto
app.use('/api/auth', authLimiter, require('./routes/authRoutes'));

// CRUD — Protegidas por JWT (el middleware se aplica dentro de cada archivo de rutas)
app.use('/api/genero', require('./routes/genero'));
app.use('/api/director', require('./routes/directorRoutes'));
app.use('/api/productora', require('./routes/productoraRoutes'));
app.use('/api/tipo', require('./routes/tipoRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));

// ============================================
// MIDDLEWARE GLOBAL DE ERRORES
// ============================================
app.use((err, req, res, next) => {
    console.error('Error no capturado:', err.message);
    res.status(500).json({ msg: 'Error interno del servidor' });
});

getConnection();

app.listen(port, () => {
    console.log(`--- 🟢 Servidor corriendo en el puerto ${port} ---`);
    console.log(`--- 🔒 Seguridad activada: Helmet, CORS, Sanitize, RateLimit ---`);
});
