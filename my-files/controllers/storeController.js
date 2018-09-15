const mongoose = require('mongoose');
const Store = mongoose.model('Store'); // It's a Singleton (unique global object)
const jimp = require('jimp'); // For resizing images
const uuid = require('uuid'); // For unique fileNames
const multer = require('multer');
const multerOptions = {
  // Where to keep uploaded file
  storage: multer.memoryStorage(), // Not disk, but memory of the server (temporarily)
  // Filters which file types to accept
  // ES6, same as: fileFilter: function (...args) {...}
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/'); // image/[jpeg|png|...]
    if (isPhoto) {
      next(null, true); // next(error, value); File is OK
    } else {
      next({ message: "That filetype isn't allowed" }, false);
    }
  }
};


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
  const store = await Store.findOne({ _id: req.params.id });

  // 2. Confirm they are the owner of the store
  // TODO
  // 3. Render out the edit form so the user can update their store
  res.render('editStore', { store, title: `Edit "${store.name}"` });
}

exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (!store) return next();
  res.render('store', { store, title: store.name });
}

exports.getStores = async (req, res) => {
  // 1. Query database for a list of all stores
  const stores = await Store.find();
  res.render('stores', { stores, title: 'Stores' });
}

exports.homePage = (req, res) => {
  res.render('index');
}

exports.resize = async (req, res, next) => {
  // Check if there is no new file to resize
  // (Multer have put file to req.file)
  if (!req.file) {
    next(); // skip to the next middleware
    return; // stop this function
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // Now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo
    .resize(800, jimp.AUTO)
    .quality(60)
    .write(`./public/uploads/${req.body.photo}`);
  // Once we have written the photo to our filesystem, keep going!
  next();
};

exports.updateStore = async (req, res) => {
  // 0. Set the location data type to be 'Point' (MongoDB type)
  req.body.location.type = 'Point';
  // 1. Find and update the store
  /**
   * findOneAndUpdate(
   *   query {Object},
   *   data {Object},
   *   options {Object}
   * )
   */
  // req.body -- Form data sent by them
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // Return new store instead of old one
    runValidators: true, // Force the model to run validators before update
  }).exec();

  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`);

  // 2. Redirect them to the store and tell them it worked
  res.redirect(`/stores/${store._id}/edit`)
}

// Upload middleware. It looks for a single upload field by id
exports.upload = multer(multerOptions).single('photo');