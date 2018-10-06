const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');


router.get('/', catchErrors(storeController.getStores));

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));

router.post('/account/forgot', catchErrors(authController.forgot));

router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmPasswords, // Check the "password" and "password-confirm" are the same
  catchErrors(authController.update),
);

router.get('/add', authController.isLoggedIn, storeController.addStore);
router.post('/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore),
);

router.post('/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore),
);

router.get('/hearts', authController.isLoggedIn, catchErrors(storeController.getHearts))

router.get('/login', userController.loginForm)
router.post('/login', authController.login)

router.get('/logout', authController.logout);

router.get('/map', storeController.mapPage);

router.get('/register', userController.registerForm)
// 1. Validate the registration data
// 2. Register the user
// 3. Log them in
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login,
);

router.post('/reviews/:id', authController.isLoggedIn, catchErrors(reviewController.addReview))

router.get('/stores', catchErrors(storeController.getStores));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/stores/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

// :varname
router.get('/reverse/:name', (req, res) => {
  const { name } = req.params;
  // Decompose string to array, reverse it, join back together
  const reversedName = [...name].reverse().join('')

  res.send(reversedName);
})

/*
  API
 */
router.get('/api/v1/search', catchErrors(storeController.searchStores));
router.post('/api/v1/stores/:id/heart', catchErrors(storeController.heartStore));
router.get('/api/v1/stores/near', catchErrors(storeController.mapStores));

module.exports = router;
