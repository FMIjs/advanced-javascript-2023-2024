const https = require("https");
const http = require("http");
const url = require("url");

const server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname == "/load") {
    const requestedUrl = parsedUrl.query["url"];
    if (typeof requestedUrl !== "string") {
      throw new Error("Invalid or empty url.");
    }

    https.get(requestedUrl, function (externalResponse) {
      externalResponse.pipe(res);
    });
  }
});

const port = 8080;
server.listen(port, function () {
  console.log("Server is listening on: " + port);
  // test on http://localhost:8080/load?url=https://www.reddit.com/.rss
});
