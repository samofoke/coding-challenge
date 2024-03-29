// SignIn.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { Box, Typography, Container } from "@mui/material";
import DynamicTextField from "../TextField.jsx/TextFieldComponent";
import CustomLoader from "../customComponents/LoaderComponent";
import CustomPopup from "../customComponents/PopupComponent";
import CustomButton from "../customComponents/CustomButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthUseContext";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ open: false, message: "", type: "" });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        formData
      );

      if (response.data.token) {
        login(response.data.user, response.data.token);
        setPopup({ open: true, message: "Login successful!", type: "success" });
        setTimeout(() => {
          navigate(`/profile/${response.data.user._id}`);
        }, 3000);
      }
      //reset the form
      setFormData({ email: "", password: "" });
    } catch (error) {
      setPopup({
        open: true,
        message: error.response ? error.response.data.message : "Login failed",
        type: "error",
      });
    } finally {
      setFormData({ email: "", password: "" });
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setPopup({ ...popup, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CustomLoader loading={loading} />
      <CustomPopup
        open={popup.open}
        handleClose={handleClosePopup}
        severity={popup.type}
        message={popup.message}
      />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#FEFCF3",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DynamicTextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <DynamicTextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
