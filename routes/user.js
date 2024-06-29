const express = require('express');
const { signup, signin } = require('../controllers/user');
const router = express.Router();


router.post('/register', signup);
router.post('/login',signin);

module.exports = router;