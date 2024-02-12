import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CustomButton from "../customComponents/CustomButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { AuthContext } from "../context/AuthUseContext";
import CustomPopup from "../customComponents/PopupComponent";

const CreateUserProfile = () => {
  const initialNFT = { title: "", description: "", image: "", nftAddress: "" };
  const initialProfileState = {
    firstName: "",
    lastName: "",
    bio: "",
    website: "",
    socialLinks: { twitter: "", instagram: "", discord: "" },
    nftCollection: [initialNFT],
  };

  const [formData, setFormData] = useState(initialProfileState);
  const [popup, setPopup] = useState({ open: false, message: "", type: "" });

  const { userId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [field]: value },
      });
    } else if (name.startsWith("nftCollection.")) {
      const field = name.split(".")[1];
      const newNftCollection = [...formData.nftCollection];
      newNftCollection[index][field] = value;
      setFormData({ ...formData, nftCollection: newNftCollection });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddNFT = () => {
    setFormData({
      ...formData,
      nftCollection: [...formData.nftCollection, initialNFT],
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/user-profile`,
        { ...formData, user: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        setPopup({
          open: true,
          message: "Profile created successfully!",
          type: "success",
        });
        setTimeout(() => navigate(`/profile/${userId}`), 3000);
      }
    } catch (error) {
      setPopup({
        open: true,
        message: "Error creating profile.",
        type: "error",
      });
      console.error("Error creating profile: ", error);
    }
  };

  const handleClosePopup = () => {
    setPopup({ ...popup, open: false });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
      <CustomPopup
        open={popup.open}
        handleClose={handleClosePopup}
        severity={popup.type}
        message={popup.message}
      />

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4">Create Profile</Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Bio"
          fullWidth
          margin="normal"
          name="bio"
          value={formData.bio}
          multiline
          rows={4}
          onChange={handleChange}
        />
        <TextField
          label="Website"
          fullWidth
          margin="normal"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Social Links:
        </Typography>
        <TextField
          label="Twitter"
          fullWidth
          margin="normal"
          name="socialLinks.twitter"
          value={formData.socialLinks.twitter}
          onChange={handleChange}
        />
        <TextField
          label="Instagram"
          fullWidth
          margin="normal"
          name="socialLinks.instagram"
          value={formData.socialLinks.instagram}
          onChange={handleChange}
        />
        <TextField
          label="Discord"
          fullWidth
          margin="normal"
          name="socialLinks.discord"
          value={formData.socialLinks.discord}
          onChange={handleChange}
        />

        <Typography variant="h6" sx={{ mt: 2 }}>
          NFT Collection:
        </Typography>
        {formData.nftCollection.map((nft, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="NFT Title"
                fullWidth
                margin="normal"
                name="nftCollection.title"
                value={nft.title}
                onChange={(e) => handleChange(e, index)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="NFT Description"
                fullWidth
                margin="normal"
                name="nftCollection.description"
                value={nft.description}
                onChange={(e) => handleChange(e, index)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="NFT Image URL"
                fullWidth
                margin="normal"
                name="nftCollection.image"
                value={nft.image}
                onChange={(e) => handleChange(e, index)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="NFT Address"
                fullWidth
                margin="normal"
                name="nftCollection.nftAddress"
                value={nft.nftAddress}
                onChange={(e) => handleChange(e, index)}
              />
            </Grid>
          </Grid>
        ))}
        <IconButton onClick={handleAddNFT} sx={{ mt: 1 }}>
          <ControlPointIcon /> Add NFT
        </IconButton>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <CustomButton onClick={handleFormSubmit}>Create Profile</CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUserProfile;
