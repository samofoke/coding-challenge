import React, { useState } from "react";
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import CustomButton from "../customComponents/CustomButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const ProfileDialog = ({ open, handleClose, handleSubmit, profileData }) => {
  const initialNFT = { title: "", description: "", image: "", nftAddress: "" };
  const [formData, setFormData] = useState(
    profileData || {
      firstName: "",
      lastName: "",
      bio: "",
      website: "",
      socialLinks: { twitter: "", instagram: "", discord: "" },
      nftCollection: [initialNFT],
    }
  );

  const handleChange = (e, index) => {
    if (e.target.name.startsWith("socialLinks.")) {
      const field = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [field]: e.target.value },
      });
    } else if (e.target.name.startsWith("nftCollection.")) {
      const field = e.target.name.split(".")[1];
      const newNftCollection = [...formData.nftCollection];
      newNftCollection[index][field] = e.target.value;
      setFormData({ ...formData, nftCollection: newNftCollection });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddNFT = () => {
    setFormData({
      ...formData,
      nftCollection: [...formData.nftCollection, initialNFT],
    });
  };

  const handleFormSubmit = () => {
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {profileData ? "Edit Profile" : "Create Profile"}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Bio"
          type="text"
          fullWidth
          multiline
          rows={4}
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Website"
          type="url"
          fullWidth
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Twitter"
          type="text"
          fullWidth
          name="socialLinks.twitter"
          value={formData.socialLinks.twitter}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Instagram"
          type="text"
          fullWidth
          name="socialLinks.instagram"
          value={formData.socialLinks.instagram}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Discord"
          type="text"
          fullWidth
          name="socialLinks.discord"
          value={formData.socialLinks.discord}
          onChange={handleChange}
        />
        {formData.nftCollection.map((nft, index) => (
          <div key={index}>
            <TextField
              margin="dense"
              label="NFT Title"
              type="text"
              fullWidth
              name="nftCollection.title"
              value={nft.title}
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              margin="dense"
              label="NFT Description"
              type="text"
              fullWidth
              name="nftCollection.description"
              value={nft.description}
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              margin="dense"
              label="NFT Image URL"
              type="url"
              fullWidth
              name="nftCollection.image"
              value={nft.image}
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              margin="dense"
              label="NFT Address"
              type="text"
              fullWidth
              name="nftCollection.nftAddress"
              value={nft.nftAddress}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        <IconButton onClick={handleAddNFT}>
          <ControlPointIcon /> Add NFT
        </IconButton>
      </DialogContent>
      <DialogActions>
        <CustomButton onClick={handleClose}>Cancel</CustomButton>
        <CustomButton onClick={handleFormSubmit}>Submit</CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
