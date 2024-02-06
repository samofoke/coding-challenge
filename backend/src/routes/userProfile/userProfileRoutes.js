const express = require("express");
const UserProfileController = require("../../controllers/userProfileController");
const { authenticateToken } = require("../../middleware/authenticationToken");
const router = express.Router();

router.post(
  "/user-profile",
  authenticateToken,
  UserProfileController.createProfile
);

module.exports = router;
