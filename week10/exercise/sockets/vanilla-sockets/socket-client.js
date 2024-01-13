console.log('hello from socket-client.js');


// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080");

// Connection established
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});

setTimeout(() => {
  let idx = 0;
  const interval = setInterval(() => {
    socket.send(`Hello again server!`);
    if (idx === 5) {
      clearInterval(interval);
    }
  }, 1000)
}, 1000);