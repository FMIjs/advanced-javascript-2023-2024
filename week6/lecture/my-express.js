const http = require("http");

function routeToRegEx(route) {
  // /test --> no route params
  const routeHasDynamicParams = route.includes(":");
  if (!routeHasDynamicParams) {
    return new RegExp(route);
  }

  // /user/:id --> with routes params
  const routeParts = route.split("/").map(function (routePart) {
    const isDynamicPart = routePart.startsWith(":");
    if (!isDynamicPart) {
      return routePart;
    }
    return "([^/]+)";
  });

  const routeRegEx = new RegExp(routeParts.join("/"));

  return routeRegEx;
}

function myExpress() {
  const router = {
    routeHandlerMap: {
      // "test": { [method]: handler }
    },
    handlerRoute(url, req, res) {
      let params = {};
      // const routeHandlerMap = router.routeHandlerMap[url] || {};
      const routeMatchData = Object.entries(router.routeHandlerMap).find(
        function (data) {
          const route = data[0];

          // 1. create reg ex from the route
          const routeRegEx = routeToRegEx(route);

          // 2. test reg ex with url
          const urlMatchesRouteRegEx = routeRegEx.test(url);
          if (!urlMatchesRouteRegEx) {
            return false;
          }

          // 3. extract params from url
          const urlMatchResult = url.match(routeRegEx); // [..., "ivanId", "postId"]
          const routeDynamicParts = route
            .split("/")
            .filter(function (routePart) {
              return routePart.startsWith(":");
            }) // [":id", ":postId"]
            .map(function (paramName) {
              return paramName.slice(1);
            }); // ["id", "postId"]

          routeDynamicParts.forEach(function (paramName, index) {
            const paramValue = urlMatchResult[index + 1];
            params[paramName] = paramValue;
          });

          return urlMatchesRouteRegEx;
        }
      );

      const routeHandlerMap = (routeMatchData || {})[1];

      const method = req.method;
      const methodHandler = routeHandlerMap[method];
      if (!methodHandler) {
        res.writeHead(404);
        res.end();
        return;
      }

      req.params = params;
      methodHandler(req, res);
      res.end();
    },
  };

  const middlewares = [];

  const server = http.createServer((req, res) => {
    let currentMiddlewareIdx = 0;

    function mainHandler() {
      const url = req.url;
      router.handlerRoute(url, req, res);
    }
    // MW1 --> MW2 --> ... --> main handler

    function getNextMiddlewareFn() {
      return middlewares[currentMiddlewareIdx++] || mainHandler;
    }
    const firstMiddleware = getNextMiddlewareFn();

    function next(err) {
      const nextMiddleware = getNextMiddlewareFn();

      if (err) {
        res.writeHead(500);
        res.write(err);
        res.end();
        return;
      }

      if (nextMiddleware === mainHandler) {
        mainHandler();
        return;
      }
      nextMiddleware(req, res, next);
    }

    firstMiddleware(req, res, next);
  });

  return {
    use(middlewareFn) {
      middlewares.push(middlewareFn);
    },
    get(route, handler) {
      const routeHandlerMap = router.routeHandlerMap[route] || {};
      routeHandlerMap["GET"] = handler;
      router.routeHandlerMap[route] = routeHandlerMap;
    },
    post(route, handler) {
      const routeHandlerMap = router.routeHandlerMap[route] || {};
      routeHandlerMap["POST"] = handler;
      router.routeHandlerMap[route] = routeHandlerMap;
    },
    put(route, handler) {
      const routeHandlerMap = router.routeHandlerMap[route] || {};
      routeHandlerMap["PUT"] = handler;
      router.routeHandlerMap[route] = routeHandlerMap;
    },
    patch(route, handler) {
      const routeHandlerMap = router.routeHandlerMap[route] || {};
      routeHandlerMap["PATCH"] = handler;
      router.routeHandlerMap[route] = routeHandlerMap;
    },
    delete(route, handler) {
      const routeHandlerMap = router.routeHandlerMap[route] || {};
      routeHandlerMap["DELETE"] = handler;
      router.routeHandlerMap[route] = routeHandlerMap;
    },
    listen(port, cb) {
      server.listen(port, cb);
    },
  };
}

module.exports = myExpress;
