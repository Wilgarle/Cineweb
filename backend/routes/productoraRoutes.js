const { Router } = require('express');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');
const {
    getProductoras,
    getProductoraById,
    createProductora,
    updateProductora,
    deleteProductora
} = require('../controllers/productoraController');

const router = Router();

// GET — Públicos
router.get('/', getProductoras);
router.get('/:id', getProductoraById);

// POST/PUT/DELETE — Solo admin autenticado
router.post('/', verificarToken, verificarAdmin, createProductora);
router.put('/:id', verificarToken, verificarAdmin, updateProductora);
router.delete('/:id', verificarToken, verificarAdmin, deleteProductora);

module.exports = router;
