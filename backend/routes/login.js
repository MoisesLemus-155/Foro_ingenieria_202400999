const {Router} = require('express');
const router = Router();
const {login} = require('../controllers/Login');

router.post('/login', login);