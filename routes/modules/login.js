const express = require('express');
const router = express.Router();
const user = require('../../models/user');
const session = require('express-session')


router.use(express.urlencoded({ extended: true }));
router.use(
  session({
    secret: '這是在幫session簽名',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    
  })
);

const checkedUser = (req, res, next) => {
  if (!req.session.isVerified) {
    const note = 'please login first';
    res.redirect(`http://localhost:3000/?wrong=${note}`);
  } else {
    next();
  }
};
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  user
    .findOne({ email, password })
    .lean()
    .then((e) => {
      if (e) {
        // res.cookie(`${e.firstName}'sCookie`, e.firstName, { signed: true });
        req.session.isVerified = true
        res.redirect(`./login/${e._id}`);
      } else {
        const note = 'wrong mail address or password!!';
        res.redirect(`http://localhost:3000/?wrong=${note}`);
      }
    })
    .catch((err) => console.log(err));
});

router.get('/secret', checkedUser, (req, res) => {
  console.log(req.cookies);
  res.render('secret');
});
router.get('/:id', checkedUser, (req, res) => {
  console.log(req.cookies);
  const id = req.params.id;
  user
    .findById(id)
    .lean()
    .then((e) => {
      res.render('userPage', { firstName: e.firstName });
    })
    .catch((err) => console.log(err));
});


module.exports = router;
