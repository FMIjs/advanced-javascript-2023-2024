const router = require('express').Router();
const userRouter = require('./users/router');

router.use('/users', userRouter);

module.exports = router;