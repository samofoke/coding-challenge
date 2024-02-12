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

      res.status(201).send(userProfile);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating user profile", error: error.message });
    }
  },

  async getUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const userProfile = await UserProfile.findOne({ user: userId }).populate(
        "user"
      );
      if (!userProfile) {
        return res.status(404).send({ message: "Profile not found." });
      }
      res.status(200).send(userProfile);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error fetching profile.", error: error.message });
    }
  },

  async updateProfile(req, res) {
    try {
      const { userId } = req.params;
      const { firstName, lastName, bio, website, nftCollection, socialLinks } =
        req.body;

      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).send({ message: "User not found" });
      }

      const updatedProfile = await UserProfile.findOneAndUpdate(
        { user: userId },
        {
          firstName,
          lastName,
          bio,
          website,
          nftCollection,
          socialLinks,
        },
        { new: true }
      );

      if (!updatedProfile) {
        return res.status(404).send({ message: "Profile not found." });
      }

      // console.log("updated data: ", updatedProfile);
      res.status(200).send(updatedProfile);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error fetching profile.", error: error.message });
    }
  },

  async deleteProfile(req, res) {
    try {
      const { userId } = req.params;
      const deletedProfile = await UserProfile.findOneAndDelete({
        user: userId,
      });

      if (!deletedProfile) {
        return res.status(404).send({ message: "Profile not found." });
      }

      res.status(200).send({ message: "Profile deleted successfully." });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error deleting profile.", error: error.message });
    }
  },
};

module.exports = userProfileController;
