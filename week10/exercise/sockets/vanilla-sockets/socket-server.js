import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('new connection');
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received some data:', data.toString());
    ws.send('got the data');
  });

});
