const router = new require("express").Router();
const users = [];
let counter = 0;

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const { firstName } = req.body;
  const newUser = { firstName, id: ++counter };
  users.push(newUser);
  res.send(newUser);
});

module.exports = router;