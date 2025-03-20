const {Router} = require('express');
const { getPublicaciones, getMisPublicaciones, createPublicacion, deleteMiPublicacion, 
        getComentarios, 
        createComentario} = require('../controllers/Publicaciones');
const router = Router();

router.get('/publicaciones', getPublicaciones);
router.get('/misPublicaciones', getMisPublicaciones);

router.post('/publicar', createPublicacion);

router.delete('/deleteMiPubli/:id', deleteMiPublicacion);

// ------------ COMENTARIOS ------------
router.get('/comentarios/:id', getComentarios);

router.post('/comentar/:id', createComentario);

module.exports = router;