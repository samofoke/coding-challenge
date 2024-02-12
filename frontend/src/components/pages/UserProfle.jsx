import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  List,
  Grid,
  Collapse,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthUseContext";
import CustomLoader from "../customComponents/LoaderComponent";
import CustomButton from "../customComponents/CustomButton";
import CustomPopup from "../customComponents/PopupComponent";
import ProfileDialog from "../CreateUserProfile/CreateEditUser";

const UserProfileView = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popup, setPopup] = useState({ open: false, message: "", type: "" });

  const { userId } = useParams();
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

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
        // console.log("user profile data: ", response.data);
        setProfileData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate(`/profile/create-profile/${userId}`);
        } else {
          setError("Failed to load the profile.");
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [userId, token, navigate]);

  const HandleSubmitDialog = async (profileData) => {
    console.log("prfole data: ", profileData.user._id);
    try {
      const userId = profileData.user._id;
      const endpoint = userId
        ? `${process.env.REACT_APP_API_URL}/profile/user-profile/${userId}`
        : `${process.env.REACT_APP_API_URL}/profile/user-profile`;

      const method = userId ? "put" : "post";

      const response = await axios[method](endpoint, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPopup({
        open: true,
        message: "Profile updated successfully!",
        type: "success",
      });
      setProfileData(response.data);
      setDialogOpen(false);
    } catch (error) {
      setPopup({
        open: true,
        message: "Failed to update profile.",
        type: "error",
      });
      setError("Failed to update the profile.");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/profile/user-profile/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setPopup({
          open: true,
          message: "Profile deleted successfully!",
          type: "success",
        });
        navigate("/");
      }
    } catch (error) {
      setPopup({
        open: true,
        message: "Failed to delete profile.",
        type: "error",
      });
      console.error(error);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  if (loading) {
    return <CustomLoader loading={loading} />;
  }
  if (!profileData && !error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h5">No profile data available</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        color="error.main"
      >
        <Typography>{error}</Typography>
      </Box>
    );
  }
  const handleClosePopup = () => {
    setPopup({ ...popup, open: false });
  };

  // console.log("profile data: ", profileData);

  return (
    <Container component="main">
      <CustomPopup
        open={popup.open}
        handleClose={handleClosePopup}
        severity={popup.type}
        message={popup.message}
      />

      <Box sx={{ marginTop: 12, padding: 2 }}>
        {profileData && (
          <>
            <CustomButton
              variant="contained"
              color="primary"
              onClick={handleDialogOpen}
              sx={{ mb: 2, mr: 2 }}
            >
              Edit Profile
            </CustomButton>

            <CustomButton
              variant="contained"
              color="secondary"
              onClick={handleDeleteProfile}
              sx={{ mb: 2 }}
            >
              Delete Profile
            </CustomButton>
          </>
        )}

        <ProfileDialog
          open={dialogOpen}
          handleSubmit={HandleSubmitDialog}
          handleClose={handleDialogClose}
          profileData={profileData}
        />

        <Typography variant="h5" textAlign="center">
          User Profile
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h6">User Details</Typography>
              <List>
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
                  <ListItemText
                    primary="Website"
                    secondary={profileData.website}
                  />
                </ListItem>
              </List>
            </Box>

            {profileData.socialLinks && (
              <Box>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                  Social Links
                </Typography>
                {profileData.socialLinks.discord && (
                  <Typography variant="body1">
                    Discord: {profileData.socialLinks.discord}
                  </Typography>
                )}
                {profileData.socialLinks.instagram && (
                  <Typography variant="body1">
                    Instagram: {profileData.socialLinks.instagram}
                  </Typography>
                )}
                {profileData.socialLinks.twitter && (
                  <Typography variant="body1">
                    Twitter: {profileData.socialLinks.twitter}
                  </Typography>
                )}
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            {profileData.nftCollection &&
              profileData.nftCollection.length > 0 && (
                <>
                  <Typography variant="h6">NFT Collection</Typography>
                  {profileData.nftCollection.map((nft) => (
                    <Card key={nft._id} sx={{ marginBottom: 2, width: "100%" }}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography component="div" variant="h6">
                            {nft.title}
                          </Typography>
                          <IconButton
                            onClick={() => handleExpandClick(nft._id)}
                            aria-expanded={expanded === nft._id}
                            aria-label="show more"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Box>
                        <Collapse
                          in={expanded === nft._id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            {nft.description}
                          </Typography>
                        </Collapse>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfileView;
