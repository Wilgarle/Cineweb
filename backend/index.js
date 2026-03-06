require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { getConnection } = require('./db/db-connection-mongo');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// --- Rutas --- //
app.use('/api/genero', require('./routes/genero'));
app.use('/api/director', require('./routes/directorRoutes'));
app.use('/api/productora', require('./routes/productoraRoutes'));
app.use('/api/tipo', require('./routes/tipoRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));


getConnection();

app.listen(port, () => {
    console.log(`--- 🟢 Servidor corriendo en el puerto ${port} ---`);
});