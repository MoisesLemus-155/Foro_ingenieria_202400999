const {Router} = require('express');
const { getCursos } = require('../controllers/Cursos_catedraticos');
const router = Router();

router.get('/cursos', getCursos)

module.exports = router;