const {Router} = require('express');
const router = Router();
const {getUsers} = require('../controllers/Usuario');

router.get('/ver', getUsers);

module.exports = router;
