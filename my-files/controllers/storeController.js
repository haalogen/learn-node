const fs = require('fs');
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

exports.editStore = async (req, res) => {
  // 1. Find the store given the ID

  // const store = await Store.findOne({ _id: req.params.id });
  const store = await JSON.parse(fs.readFileSync(__dirname + '/../data/stores.json', 'utf-8'))[0];

  // 2. Confirm they are the owner of the store
  // TODO
  // 3. Render out the edit form so the user can update their store
  res.render('editStore', { store, title: `Edit "${store.name}"` });
}

exports.getStores = async (req, res) => {
  // 1. Query database for a list of all stores
  //
  // const stores = await Store.find();
  const stores = await JSON.parse(fs.readFileSync(__dirname + '/../data/stores.json', 'utf-8'));
  res.render('stores', { stores, title: 'Stores' });
}

exports.updateStore = async (req, res) => {
  // 1. Find and update the store
  /**
   * findOneAndUpdate(
   *   query {Object},
   *   data {Object},
   *   options {Object}
   * )
   */
  // req.body -- Form data sent by them

  // const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
  //   new: true, // Return new store instead of old one
  //   runValidators: true, // Force the model to run validators before update
  // }).exec();

  let store = await JSON.parse(fs.readFileSync(__dirname + '/../data/stores.json', 'utf-8'))[0];
  store = { ...store, ...req.body };

  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`);

  // 2. Redirect them to the store and tell them it worked
  res.redirect(`/stores/${store._id}/edit`)
}