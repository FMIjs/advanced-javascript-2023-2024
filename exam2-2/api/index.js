const { Router } = require('express');
const userRouter = require('./resources/user');
const postRouter = require('./resources/post');

module.exports.connect = function (app, path) {
  const router = Router();

  router.use('/users', userRouter, (_, res) => res.send(res.locals.data));
  router.use('/posts', postRouter, (_, res) => res.send(res.locals.data));

  app.use(path, router);
};