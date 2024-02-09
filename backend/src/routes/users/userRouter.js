const express = require("express");
const { registerUser, loginUser } = require("../../controllers/userController");
const { authenticateToken } = require("../../middleware/authenticationToken");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// the Auth route checker
router.get("/check-auth", authenticateToken, async (req, res) => {
  try {
    res.status(200).send({ user: req.user });
  } catch (error) {
    res.status(500).send({
      message: "Error verifying Authentication",
      error: error.message,
    });
  }
});

module.exports = router;
