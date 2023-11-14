const http = require("http");
const fs = require("fs");
const { Transform } = require("stream");
const path = require("path");

const pathBase = "./week5/exercise/templates/";
const partialInterpolationRegEx = /{{?[a-zA-Z]*}?$/;

function fetchTemplateHandler(fileName, params, res) {
  const filePath = path.resolve(pathBase + fileName + ".txt");
  const readStream = fs.createReadStream(filePath, {
    encoding: "utf8",
    highWaterMark: 10,
  });

  readStream.on("error", serverErrorHandler);

  let partialInterpolationFromLastChunk = "";
  const transformStream = new Transform({
    encoding: "utf8",
    transform(chunk, encoding, cb) {
      const chunkString = chunk.toString();
      if (!chunkString) {
        return cb(null, null);
      }

      let finalChunkString = "";

      if (partialInterpolationFromLastChunk) {
        finalChunkString = partialInterpolationFromLastChunk;
        partialInterpolationFromLastChunk = "";
      }
      finalChunkString += chunkString;

      Object.keys(params).forEach((paramKey) => {
        const paramRegEx = new RegExp(`{{${paramKey}}}`, "g");
        finalChunkString = finalChunkString.replace(
          paramRegEx,
          params[paramKey] || ""
        );
      });

      const partialInterpolationMatch = (chunkString.match(
        partialInterpolationRegEx
      ) || [])[0]; // the chunk ends with something like "{{nam"
      if (partialInterpolationMatch) {
        partialInterpolationFromLastChunk = partialInterpolationMatch;
        // we take this partial match and save it for the next chunk.

        finalChunkString = finalChunkString.slice(
          0,
          -partialInterpolationMatch.length
        );
      }
      cb(null, finalChunkString || null);
    },
  });

  transformStream.buffer = "";
  readStream.pipe(transformStream).pipe(res);
}

function handleGetRequest(req, res) {
  const splitLogicRes = req.url.split("?");
  const reqPath = splitLogicRes[0];
  const queryParamsString = splitLogicRes[1] || "";
  const queryParams = queryParamsString
    .split("&")
    .reduce(function (acc, current) {
      const splitRes = current.split("=");
      const key = splitRes[0];
      const value = splitRes[1];
      if (!key || !value) {
        return acc;
      }
      acc[key] = value;
      return acc;
    }, {});

  const isFetchTemplateRequest = reqPath.includes("/fetch-template/");
  if (isFetchTemplateRequest) {
    const fileName = reqPath.split("/fetch-template/")[1];
    fetchTemplateHandler(fileName, queryParams, res);
    return;
  }
  notFoundHandler(req, res);
}

function notFoundHandler(req, res) {
  res.writeHead(404);
  res.write("Not found!");
  res.end();
}
function serverErrorHandler(req, res) {
  res.writeHead(500);
  res.write("Server error!");
  res.end();
}

const methodHandlers = {
  GET: handleGetRequest,
};

const server = http.createServer(function serverHandler(req, res) {
  const requestMethod = req.method.toUpperCase();

  const handler = methodHandlers[requestMethod] || notFoundHandler;
  handler(req, res);
});

const port = 8080;
server.listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server is listening on: " + port);
});
