const express = require("express");
const User = require("../../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
    });
    await user.save();
    console.log("user info: ", user);
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
