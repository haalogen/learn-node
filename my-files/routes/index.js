const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');


router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

// :varname
router.get('/reverse/:name', (req, res) => {
  const { name } = req.params;
  // Decompose string to array, reverse it, join back together
  const reversedName = [...name].reverse().join('')

  res.send(reversedName);
})

module.exports = router;
