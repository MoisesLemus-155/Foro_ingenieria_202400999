const {Router} = require('express');
const router = Router();
const {getUsers, UpdateMyUser} = require('../controllers/Usuario');

router.get('/ver', getUsers);
router.post('/actualizarMiPerfil', UpdateMyUser);

module.exports = router;
