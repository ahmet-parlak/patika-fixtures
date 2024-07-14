const { body } = require('express-validator');

module.exports = [
  body('email').isEmail().withMessage('Please enter your email!'),
  body('password').not().isEmpty().withMessage('Please enter your password!'),
];
