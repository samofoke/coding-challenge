const express = require("express");
const router = express.Router();
const userRoute = require("./users/userRouter");

router.use("/user", userRoute);

module.exports = router;
