const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

function handleGetRequest(req, res) {
  const parsedPath = path.parse(req.url === '/' ? 'index.html' : req.url);
  if (parsedPath.ext === '.html') {
    fs.readFile(parsedPath.base, function (err, fileBuffer) {
      if (err) {
        if (err.code === 'ENOENT') {
          notFoundHandler(req, res);
          return;
        }
        serverErrorHandler(req, res);
        return;
      }
      res.writeHead(200);
      res.write(fileBuffer);
      res.end();
    });
    return;
  }
  notFoundHandler(req, res);
}

function handlePostRequest(req, res) {

}

function notFoundHandler(req, res) {
  res.writeHead(404);
  res.write('Not found!')
  res.end();
};
function serverErrorHandler(req, res) {
  res.writeHead(500);
  res.write('Server error!');
  res.end();
}

const methodHandlers = {
  GET: handleGetRequest,
  POST: handlePostRequest
};

const server = http.createServer(function serverHandler(req, res) {
  const requestMethod = req.method.toUpperCase();

  const handler = methodHandlers[requestMethod] || notFoundHandler;
  handler(req, res);
});

server.listen(config.port, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Server is listening on :' + config.port);
});