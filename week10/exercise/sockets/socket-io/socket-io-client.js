console.log('hello from socket-io-client.js');

const socket = io("localhost:8080");

socket.io.on('ping', () => {
  console.log('ping from socket.io.on');
});

socket.on('ping', () => {
  console.log('ping from socket.on');
});
