const {Router} = require('express');
const { getPublicaciones, getMisPublicaciones, createPublicacion } = require('../controllers/Publicaciones');
const router = Router();

router.get('/publicaciones', getPublicaciones);
router.get('/misPublicaciones', getMisPublicaciones);

router.post('/publicar', createPublicacion);

module.exports = router;