const router = require('express').Router();

let counter = 0;
let users = [];

router.get('/:id', function (req, res) {
  const id = +req.params.id;
  const user = users.find(u => u.id === id);
  res.send(user);
});

router.get('/', function (req, res) {
  res.send(users);
});

router.post('/', function (req, res) {
  const { firstName, lastName } = req.body;
  const newUser = { firstName, lastName, id: ++counter };
  users = users.concat(newUser);
  res.status(201).send(newUser);
});

router.put('/:id', function (req, res) {
  const id = +req.params.id;
  const user = users.find(u => u.id === id);
  const { firstName, lastName } = req.body;
  user.firstName = firstName;
  user.lastName = lastName;
  users = users.filter(user => user.id !== id).concat(user);
  res.send(user);
});

router.delete('/:id', function (req, res) {
  const id = +req.params.id;
  const user = users.find(u => u.id === id);
  users = users.filter(user => user.id !== id);
  res.send(user);
});

module.exports = router;