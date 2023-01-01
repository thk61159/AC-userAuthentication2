const user = require('../user');
const db = require('../../config/mongoose');
const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman',
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday',
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram',
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!',
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password',
  },
];
db.once('open', () => {
  console.log('connect to Mongo');
  users.forEach((e) =>
    user.create({
      firstName: e.firstName,
      email: e.email,
      password: e.password,
    })
  );

  console.log('Done');
});
