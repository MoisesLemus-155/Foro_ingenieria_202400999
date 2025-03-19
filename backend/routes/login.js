const {Router} = require('express');
const router = Router();
const {login, lostPassword, newPassword} = require('../controllers/Login');

router.post('/login', login);

router.post('/lostPassword', lostPassword);
router.post('/newPassword', newPassword);

module.exports = router;