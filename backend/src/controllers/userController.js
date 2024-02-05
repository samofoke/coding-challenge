const User = require("../models/User");
const bcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "user already exists." });
    }

    const hashPassword = await bcypt.hash(password, 8);

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
    console.log("user info: ", user);
    res
      .status(201)
      .send({ message: "User registered successfully", user, token });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

module.exports = { registerUser };
