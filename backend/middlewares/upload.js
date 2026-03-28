const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuración de Cloudinary — Usando variables de entorno configuradas previamente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuración de almacenamiento en la Nube (Cloudinary)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cineweb_uploads', // Carpeta donde se guardarán las fotos en Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif', 'avif'], // Formatos permitidos
    public_id: (req, file) => {
      // Renombrar archivo en la nube: timestamp_nombreOriginal
      const name = file.originalname.split('.')[0];
      return `${Date.now()}_${name}`;
    }
  }
});

// Filtro de seguridad adicional para tipos de archivo
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen (png, jpg, jpeg, webp, gif, avif).'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB por foto
});

module.exports = upload;
