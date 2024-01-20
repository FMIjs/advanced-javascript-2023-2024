const path = require("path");
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const bodyParser = require("body-parser");
const apiRouter = require("./api");

let connectedSockets = [];
const jwtSecret = 'secret';

app.use(cors());
app.use(express.static("../client/dist"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) next(new Error('Missing token'));
  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) return next(error);
    req.auth = decoded;
    next();
  });
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "test@123.com" && password === "123") {
    var token = jwt.sign({ email, id: 1 }, jwtSecret);
    return res.cookie("auth", token, { secure: false, httpOnly: true }).send({ token });
  }
  res.status(401).send({ token: null });
});

app.use("/api", auth, apiRouter);

app.get("*", (req, res) => {
  if (req.url === '/favicon.ico') return res.status(404).end();
  res.sendFile(path.resolve("../client/dist/index.html"));
})

app.use((err, req, res, next) => {
  if (err) {
    if (err.message === 'Missing token') {
      return res.status(401).end();
    }
    return res.send({ message: 'Server error!' }).end();;
  }

});

io.on("connection", (socket) => {
  connectedSockets = connectedSockets.concat(socket);
  socket.on("message", (message) => {
    for (const socket of connectedSockets) {
      socket.send(message);
    }
  });

  socket.on("disconnected", () => {
    connectedSockets = connectedSockets.filter(s => s !== socket);
  });
});



server.listen(8000, () => {
  console.log("Server is listening on :8000");
});
