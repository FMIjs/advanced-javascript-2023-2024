import { Server } from 'socket.io';

import path from 'path';

import express from 'express';


const app = express();


const pathBase = `/advanced-javascript-2023-2024/week11/exercise/sockets/socket-io`

// const pathToStaticJs = path.resolve(`${pathBase}/public/js`);
// app.use('/js', express.static(pathToStaticJs));
// const pathToStatic = path.resolve(`${pathBase}/public`);
// app.use(express.static(pathToStatic));
app.use(express.static('./public'));

app.get('/', function(req, res){
  res.sendFile('./socket-io/public/html/index.html',{ root: '../' });
});

app.listen(8080);



const io = new Server(8081);

console.log('hello from socket-io-server.js');
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });


  setTimeout(() => {
    io.emit('ping');
  }, 500);
});