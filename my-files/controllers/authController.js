const passport = require('passport'); // For logging in

exports.isLoggedIn = (req, res, next) => {
  // 1. Check if the user is authenticated (Passport.js)
  if (req.isAuthenticated()) {
    return next(); // Carry on! They are logged in!
  };
  req.flash('error', 'Oops! You must be logged in!');
  res.redirect('/login');
}

// authenticate(strategyType=['local' (username & password), 'facebook' (token), ...], config)
exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
}