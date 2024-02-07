const express = require("express");
const UserProfileController = require("../../controllers/userProfileController");
const { authenticateToken } = require("../../middleware/authenticationToken");
const router = express.Router();

router.post(
  "/user-profile",
  authenticateToken,
  UserProfileController.createProfile
);

router.get(
  "/user-profile/:userId",
  authenticateToken,
  UserProfileController.getUserProfile
);

module.exports = router;
