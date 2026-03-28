const { Router } = require('express');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');
const {
    getTipos,
    getTipoById,
    createTipo,
    updateTipo,
    deleteTipo
} = require('../controllers/tipoController');

const router = Router();

// GET — Públicos
router.get('/', getTipos);
router.get('/:id', getTipoById);

// POST/PUT/DELETE — Solo admin autenticado
router.post('/', verificarToken, verificarAdmin, createTipo);
router.put('/:id', verificarToken, verificarAdmin, updateTipo);
router.delete('/:id', verificarToken, verificarAdmin, deleteTipo);

module.exports = router;
