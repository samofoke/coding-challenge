const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ message: "Unauthorized: token invalid.", error: error.message });
  }
};

module.exports = { authenticateToken };
