const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./api");

const users = [];

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use("/api", apiRouter);

app.post("/", (req, res) => {
  let { firstName } = req.body;
  const error = firstName.length < 3 ? "Name must be longer than 3 characters" : null;
  if (!error) {
    users.push({ firstName });
    firstName = '';
  }
  res.render("home", { firstName, error, users, anchor: error ? '#first-name' : '' });
});

app.get("/", (req, res) => {
  res.render("home", { firstName: '', error: null, users, anchor: '' });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(8080, () => {
  console.log("Server is listening on :8080");
});
