const { Router } = require('express');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');
const {
    getDirectores,
    getDirectorById,
    createDirector,
    updateDirector,
    deleteDirector
} = require('../controllers/directorController');

const router = Router();

// GET — Públicos
router.get('/', getDirectores);
router.get('/:id', getDirectorById);

// POST/PUT/DELETE — Solo admin autenticado
router.post('/', verificarToken, verificarAdmin, createDirector);
router.put('/:id', verificarToken, verificarAdmin, updateDirector);
router.delete('/:id', verificarToken, verificarAdmin, deleteDirector);

module.exports = router;
