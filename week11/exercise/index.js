const path = require("path");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bodyParser = require("body-parser");

let connectedSockets = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use('/api', require('./api'));


const messages = [
  { userName: "John", message: "Hello, I am John" }
];
io.on("connection", (socket) => {
  connectedSockets = connectedSockets.concat(socket);

  socket.emit('message-history', messages);

  socket.on("chat-message", (messageData) => {
    messages.push(messageData);
    io.emit("chat-message", messageData);
  });

  socket.on("disconnected", () => {
    connectedSockets = connectedSockets.filter(s => s !== socket);
  });
  setInterval(() => {
    socket.emit("system-message", "Hello from server");
  }, 2000);
});



server.listen(8080, () => {
  console.log("Server is listening on :8080");
});
