function jsonParser(data) {
  return JSON.parse(data);
}
jsonParser.type = "application/json";

function urlEncodedParser(data) {
  const searchParams = new URLSearchParams(data);
  const searParamsEntriesArray = Array.from(searchParams.entries());

  return searParamsEntriesArray.reduce(function (acc, curr) {
    const key = curr[0];
    const value = curr[1];
    acc[key] = value;
    return acc;
  }, {});
}
urlEncodedParser.type = "application/x-www-form-urlencoded";

function bodyParser(parser) {
  return function (req, res, next) {
    const contentType = req.headers["content-type"];

    parser =
      parser || contentType === jsonParser.type
        ? jsonParser
        : contentType === urlEncodedParser.type
        ? urlEncodedParser
        : null;

    if (parser === null || contentType !== parser.type) return next();

    let data = "";
    req.on("data", (chunk) => (data += chunk.toString()));
    req.on("end", () => {
      req.body = parser(data);
      next();
    });
  };
}

module.exports = {
  jsonParser,
  urlEncodedParser,
  bodyParser,
};
