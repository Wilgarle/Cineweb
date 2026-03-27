const { Router } = require('express');
const { registrarUsuario, loginUsuario } = require('../controllers/authController');

const router = Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;
