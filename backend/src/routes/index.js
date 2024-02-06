const express = require("express");
const router = express.Router();
const userRoute = require("./users/userRouter");
const userProfileRoute = require("./userProfile/userProfileRoutes");

router.use("/user", userRoute);
router.use("/profile", userProfileRoute);

module.exports = router;
