const path = require("path");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bodyParser = require("body-parser");
const apiRouter = require("./api");

let connectedSockets = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use("/api", apiRouter);

// app.get("*", (req, res) => {
//   if (req.url === '/favicon.ico') return res.status(404).end();
//   res.sendFile(path.resolve("./public/index.html"));
// })

io.on("connection", (socket) => {
  connectedSockets = connectedSockets.concat(socket);

  setInterval(() => {
    socket.emit("system-message", "Hello from server");
  }, 2000);

  socket.on("chat-message", (message) => {
    // for(const socket of connectedSockets) {
    //   socket.send(message);
    // }

    io.emit("chat-message", message);
  });

  socket.on("disconnected", () => {
    connectedSockets = connectedSockets.filter(s => s !== socket);
  });
});



server.listen(8080, () => {
  console.log("Server is listening on :8080");
});
