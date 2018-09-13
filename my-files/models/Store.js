const mongoose = require('mongoose');
// We gonna use Async/Await and ES6 Promises as Mongoose promises
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    // Rule of thumb: Do data normalization as close as possible to the model
    trim: true,
    required: 'Please enter a store name!',
  },
  slug: String,
  description: {
    type: String,
    trim: true,

  },
  tags: [String],
});

// Auto-generate slug before saving Store state
storeSchema.pre('save', function (next) {
  // Can't be an arrow function because we need `this` to be equal to store
  // that we are trying to save.
  if (!this.isModified('name')) {
    next(); // Skip it
    return; // Stop this function from running
  }
  this.slug = slug(this.name);
  next();
  // TODO: Make more resilient so the slugs are unique
});


// "Main" export of the file
module.exports = mongoose.model('Store', storeSchema);