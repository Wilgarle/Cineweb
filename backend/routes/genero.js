const { Router } = require('express');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');
const {
    getGeneros,
    getGeneroById,
    createGenero,
    updateGenero,
    deleteGenero
} = require('../controllers/generoController');

const router = Router();

// GET — Públicos
router.get('/', getGeneros);
router.get('/:id', getGeneroById);

// POST/PUT/DELETE — Solo admin autenticado
router.post('/', verificarToken, verificarAdmin, createGenero);
router.put('/:id', verificarToken, verificarAdmin, updateGenero);
router.delete('/:id', verificarToken, verificarAdmin, deleteGenero);

module.exports = router;
