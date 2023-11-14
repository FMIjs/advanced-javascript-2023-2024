const http = require('http');
const url = require("url");


const localDb = {
  'someProp': 'test'
};

const server = http.createServer(function(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (!pathname.startsWith('/load')) {
    res.statusCode = 404;
    res.write("Not found!")
    res.end();
    return;
  }

  const desiredProp = (pathname.match(/\/load\/([a-zA-Z]+)/) || [null, null])[1];
  const result = localDb[desiredProp || ''];
  res.write(result || '<missing prop>')
  res.end();
});

const port = 8080;
server.listen(port, function() {
  console.log("Server is listening on: " + port);
});