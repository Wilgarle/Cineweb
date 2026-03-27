const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear el directorio si no existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Renombrar archivo para evitar colisiones: timestamp-nombreOriginal
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro de archivos para aceptar solo imágenes png/jpg/jpeg
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    // Validar extensión
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Validar mimetype
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes en formato PNG o JPG/JPEG.'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limitar a 5MB
    fileFilter: fileFilter
});

module.exports = upload;
