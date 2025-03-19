const {Router} = require('express');
const { getPublicaciones, getMisPublicaciones, createPublicacion, deleteMiPublicacion } = require('../controllers/Publicaciones');
const router = Router();

router.get('/publicaciones', getPublicaciones);
router.get('/misPublicaciones', getMisPublicaciones);

router.post('/publicar', createPublicacion);

router.delete('/deleteMiPubli/:id', deleteMiPublicacion);

module.exports = router;