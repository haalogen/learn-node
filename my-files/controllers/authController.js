const passport = require('passport'); // For logging in

// authenticate(strategyType=['local' (username & password), 'facebook' (token), ...], config)
exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!',
});