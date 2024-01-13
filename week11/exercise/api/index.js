const router = new require("express").Router();
const userRouter = require("./user");

router.use("/users", userRouter);

module.exports = router;