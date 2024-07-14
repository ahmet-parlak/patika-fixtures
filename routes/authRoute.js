const express = require('express');
const authController = require('../controllers/authController');
const registerValidation = require('../middlewares/validations/register');
const loginValidation = require('../middlewares/validations/login');

const authMiddleware = require('../middlewares/auth');
const guestMiddleware = require('../middlewares/guest');

const router = express.Router();

router.post(
  '/register',
  guestMiddleware,
  registerValidation,
  authController.register
);

router.post('/login', guestMiddleware, loginValidation, authController.login);

router.get('/logout', authMiddleware, authController.logout);

module.exports = router;
