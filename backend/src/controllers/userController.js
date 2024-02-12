const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "user already exists." });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    //generate jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res
      .status(201)
      .send({ message: "User registered successfully", user, token });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).send({ message: "Invalid email and password." });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res
      .status(200)
      .send({ message: "Login Successfully.", token, user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error logging in.", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
