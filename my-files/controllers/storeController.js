const mongoose = require('mongoose');
const Store = mongoose.model('Store'); // It's a Singleton (unique global object)

exports.homePage = (req, res) => {
  res.render('index');
}

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
}

exports.createStore = async (req, res) => {
  // save() is Async: Sends request to MongoDB, returns with new Store state / Error
  const store = await (new Store(req.body)).save();
  /**
   * flash(
   *   type {String} = ['success', 'error', 'warning', 'info', 'yourCustom'],
   *   message {String}
   * )
   */
  req.flash('success', `Successfully created "${store.name}". Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
}

exports.getStores = async (req, res) => {
  // 1. Query database for a list of all stores
  const stores = await Store.find();
  res.render('stores', { stores, title: 'Stores' });
}