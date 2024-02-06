const UserProfile = require("../models/userProfile");
const User = require("../models/User");

const userProfileController = {
  //create a new user profile
  async createProfile(req, res) {
    try {
      const {
        user,
        firstName,
        lastName,
        bio,
        website,
        nftCollection,
        socialLinks,
      } = req.body;

      //check if the user exists
      const existingUser = await User.findById(user);
      if (!existingUser) {
        return res.status(404).send({ message: "User not found" });
      }

      const userProfile = new UserProfile({
        user,
        firstName,
        lastName,
        bio,
        website,
        nftCollection,
        socialLinks,
      });

      await userProfile.save();
      console.log("created user profile: ", userProfile);
      res.status(201).send(userProfile);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating user profile", error: error.message });
    }
  },
};

module.exports = userProfileController;
