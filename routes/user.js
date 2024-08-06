const express = require('express');
const { signup, signin, forgotPassword, resetPassword} = require('../controllers/user');
const router = express.Router();


router.post('/register', signup);
router.post('/login',signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;