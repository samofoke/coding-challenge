import React, { useContext, useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
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

  console.log("get user: ", userId);
  console.log("The token: ", token);

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
    <CustomLoader loading={loading} />;
  }
};

export default UserProfileView;
