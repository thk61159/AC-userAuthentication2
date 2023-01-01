const express = require('express');
const router = express.Router();
const user = require('../../models/user');
const session = require('express-session');

router.use(
  session({
    secret: '這是在幫session簽名',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

router.get('/', (req, res) => {
  let wrong = req.query.wrong
  res.render('index', { wrong });
});
router.get('/logout', (req, res) => {
  const note = '您已登出'
  req.session.isVerified = false;
  res.redirect(`http://localhost:3000/?wrong=${note}`);
});

module.exports = router;
