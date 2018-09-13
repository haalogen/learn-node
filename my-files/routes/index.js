const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  // `req` -- Request: object with info coming in
  // `res` -- Response: object with methods for sending data to client
  // `next` -- function for passing stuff to middleware

  // res.send('Hey! It works!');
  // res.json(stan)
  // res.send(req.query.name);

  // render(pugTemplateName)
  res.render('hello', {
    dog: req.query.dog
  });
});

// :varname
router.get('/reverse/:name', (req, res) => {
  const { name } = req.params;
  // Decompose string to array, reverse it, join back together
  const reversedName = [...name].reverse().join('')

  res.send(reversedName);
})

module.exports = router;
