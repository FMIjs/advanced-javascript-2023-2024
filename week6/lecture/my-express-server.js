const myExpress = require("./my-express.js");

const app = myExpress();

function sampleMiddleware(req, res, next) {
  req.test = "test";
  next(); // --> call next middleware
}

const methodsWithBody = ["POST", "PUT", "PATCH"];
function myBodyParserMiddleware(req, res, next) {
  if (!methodsWithBody.includes(req.method)) {
    next();
    return;
  }

  let buffer = "";
  req.on("data", function (chunk) {
    buffer += chunk;
  });

  req.on("error", function (err) {
    next(err);
  });
  req.on("end", function () {
    req.body = JSON.parse(buffer);
    next();
  });
}

app.use(myBodyParserMiddleware);
app.use(sampleMiddleware);

app.get("/test", function (req, res) {
  console.log("in handler");
  res.write("Hello world");
});

app.post("/test", function (req, res) {
  console.log(req.body);

  res.write("Hello world");
});

app.get("/user/:id", function (req, res) {
  // --> Get a single user
  const id = req.params.id;
  res.write("Hello user " + id);
});
app.get("/user", function (req, res) {}); // --> Get all users
app.post("/user", function (req, res) {}); // --> Create new user
app.put("/user/:id", function (req, res) {}); // --> Update user -- full change
app.patch("/user/:id", function (req, res) {}); // --> Update user -- partial change
app.delete("/user/:id", function (req, res) {}); // --> Delete user

app.get("/user/:id/post/:postId", function (req, res) {
  const id = "ivanId"; // req.params.name;
  const postId = "postId"; // req.params.name;
  res.write("Hello user " + id + "; post " + postId);
});

const port = 8080;
app.listen(port, function () {
  console.log("Listening on port: " + port);
});
