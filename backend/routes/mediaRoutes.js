const { Router } = require("express");
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

const {
    getMedias,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia
} = require('../controllers/mediaController');

const upload = require('../middlewares/upload');

const router = Router();

// GET — Públicos (el catálogo es visible para todos)
router.get('/', getMedias);
router.get('/:id', getMediaById);

// POST/PUT/DELETE — Solo admin autenticado
router.post('/', verificarToken, verificarAdmin, upload.single('imagen'), createMedia);
router.put('/:id', verificarToken, verificarAdmin, upload.single('imagen'), updateMedia);
router.delete('/:id', verificarToken, verificarAdmin, deleteMedia);

module.exports = router;
