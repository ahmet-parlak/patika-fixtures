const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = [];
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  validationResult(req)
    .array()
    .forEach((error) => {
      errors.push(error.msg);
    });

  if (errors.length > 0) {
    req.flash('errors', errors.length != 0 ? errors : 'Somethings wrong');
    req.flash('registerOldVals', req.body);
    res.status(400).redirect('/login');
    return;
  }

  const isEmailExists = await User.findOne({ email });

  if (isEmailExists) {
    req.flash('errors', ['This e-mail is already in use!']);
    req.flash('registerOldVals', req.body);
    res.status(400).redirect('/login');
    return;
  }

  try {
    await User.create({ name, email, password });
  } catch (error) {
    req.flash('errors', ['Somethings wrong']);
    req.flash('registerOldVals', req.body);
    res.status(400).redirect('/login');
  }

  req.flash('success', [
    'You have successfully registered! You can log in your e-mail and password.',
  ]);
  res.status(401).redirect('/login');
};

exports.login = (req, res) => {
  const errors = [];
  validationResult(req)
    .array()
    .forEach((error) => {
      errors.push(error.msg);
    });

  if (errors.length > 0) {
    req.flash('errors', errors.length != 0 ? errors : ['Somethings wrong']);
    req.flash('loginOldVals', req.body);
    res.status(400).redirect('/login');
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      bcrypt.compare(password, user.password).then((isCorrect) => {
        if (isCorrect) {
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };

          req.flash('success', 'Login successful!');
          res.redirect('/');
          return;
        }

        req.flash('loginErrors', ['Email or password incorrect!']);
        req.flash('loginOldVals', req.body);
        return;
      });
    })
    .catch((err) => {
      req.flash('errors', ['Somethings wrong']);
      req.flash('loginOldVals', req.body);
      res.status(400).redirect('/login');
      return;
    });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
