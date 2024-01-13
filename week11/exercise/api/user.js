const router = new require("express").Router();
const users = [{ id: 1, firstName: "John"  }];
let counter = 0;

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const { firstName } = req.body;

  // weird "login" logic
  const existingUser = users.find((user) => user.firstName === firstName);
  if (existingUser) {
    return res.send(existingUser);
  }

  const newUser = { firstName, id: ++counter };
  users.push(newUser);
  res.send(newUser);
});

module.exports = router;