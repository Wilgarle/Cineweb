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


getConnection();

app.listen(port, () => {
    console.log(`--- 🟢 Servidor corriendo en el puerto ${port} ---`);
});