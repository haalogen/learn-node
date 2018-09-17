/**
 * "userController" is responsible for FORMS: login/logout, registration, password reset, ...
 */
const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
}

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
}

exports.validateRegister = (req, res, next) => {
  // Defend from registering with script tags, ...
  req.sanitizeBody('name'); // Comes from "express-validator" package
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'That email is not valid').isEmail();
  /**
   * normalizeEmail(options): (by default)
   * w.e.s@gmail.com
   * Wes@gmail.com
   * wes+bos@gmail.com
   * all become: wes@gmail.com
   */
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password cannot be blank').notEmpty();
  req.checkBody('password-confirm', 'Confirmed Password cannot be blank').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map((err) => err.msg));
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
    return; // stop the function from running
  }
  next(); // There were no errors!
}