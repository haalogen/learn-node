/**
 * "userController" is responsible for FORMS: login/logout, registration, password reset, ...
 */
const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
}