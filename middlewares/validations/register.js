const { body } = require('express-validator');

module.exports = [
  body('name').not().isEmpty().withMessage('Please enter your name!'),
  body('email').isEmail().withMessage('Please enter your email!'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('The password field must consist of at least 6 characters!'),
];
