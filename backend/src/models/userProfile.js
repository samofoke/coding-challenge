const mongoose = require("mongoose");
const nftSchema = require("./nftSchema");

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  firstName: String,
  lastName: String,
  bio: String,
  website: String,
  nftCollection: [nftSchema],
  socialLinks: {
    twitter: String,
    instagram: String,
    discord: String,
  },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
