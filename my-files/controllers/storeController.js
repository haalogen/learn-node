const mongoose = require('mongoose');
const Store = mongoose.model('Store'); // It's a Singleton (unique global object)

exports.homePage = (req, res) => {
  res.render('index');
}

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
}

exports.createStore = async (req, res) => {
  const store = new Store(req.body);
  // Async: Sends request to MongoDB, returns with new Store state / Error
  const result = await store.save();
  console.log(result);
  res.redirect('/');
}