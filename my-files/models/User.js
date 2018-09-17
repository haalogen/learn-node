const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    require: 'Please supply email address'
    trim: true,
    unique: true, // Will give ugly error
    validate: [validator.isEmail, 'Invalid Email Address']
  },
  name: {
    type: String,
    require: 'Please supply a name',
    trim: true,
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' }); // Adds auth for each user
userSchema.plugin(mongodbErrorHandler); // For "prettifying" ugly MongoDB errors


module.exports = mongoose.model('User', userSchema);