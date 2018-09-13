exports.myMiddleware = (req, res, next) => {
  req.name = 'Stan';
  if (req.name === 'Stan') {
    throw Error(`That is a stupid name: ${req.name}`);
  }
  // res.cookie('name', 'Stan is cool', { maxAge: 987654321 });
  next();
}

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
}
