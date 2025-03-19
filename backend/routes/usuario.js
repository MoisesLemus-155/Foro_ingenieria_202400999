const {Router} = require('express');
const router = Router();
const {getUsers, UpdateMyUser, cursosAprobados} = require('../controllers/Usuario');

router.get('/ver', getUsers);
router.post('/actualizarMiPerfil', UpdateMyUser);

router.post('/cursosAprovados', cursosAprobados);

module.exports = router;
