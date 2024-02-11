import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthUseContext";
import CustomLoader from "../customComponents/LoaderComponent";
// import CustomPopup from "../customComponents/PopupComponent";

const UserProfileView = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { userId } = useParams();
  const { token } = useContext(AuthContext);

  // console.log("get user: ", userId);
  // console.log("The token: ", token);

  useEffect(() => {
    if (!userId || !token) {
      setError("Unauthorized access. Please log in.");
      return;
    }

    const getProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile/user-profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("user profile data: ", response.data);
        setProfileData(response.data);
      } catch (error) {
        // setError({
        //   message: "Failed to load the profile.",
        //   error: error.message,
        // });
        setError("Failed to load the profile.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [userId, token]);

  if (loading) {
    return <CustomLoader loading={loading} />;
  }

  if (!profileData) {
    return <Typography>No profile data available</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  console.log("profile data: ", profileData.nftCollection);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">User Profile</Typography>
        <List sx={{ width: "100%" }}>
          <ListItem>
            <ListItemText
              primary="First Name"
              secondary={profileData.firstName}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Last Name"
              secondary={profileData.lastName}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Bio" secondary={profileData.bio} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Website" secondary={profileData.website} />
          </ListItem>
          {}
        </List>
      </Box>
    </Container>
  );
};

export default UserProfileView;
