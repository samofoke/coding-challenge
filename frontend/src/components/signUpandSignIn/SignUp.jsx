// Import necessary components and hooks
import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Container } from "@mui/material";
import DynamicTextField from "../TextField.jsx/TextFieldComponent";
import CustomLoader from "../customComponents/LoaderComponent";
import CustomPopup from "../customComponents/PopupComponent";
import CustomButton from "../customComponents/CustomButton";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [successPopup, setSuccessPopup] = useState({
    open: false,
    content: "",
  });
  const [errorPopup, setErrorPopup] = useState({ open: false, content: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrorPopup({
        open: true,
        content: "Please enter a valid email address.",
      });

      setFormData({ username: "", email: "", password: "" });

      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        formData
      );
      console.log(response.data);
      setSuccessPopup({ open: true, content: response.data.message });

      //reset the form
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      setErrorPopup({
        open: true,
        content: error.response
          ? error.response.data.message
          : "Login user failed",
      });
    } finally {
      setFormData({ username: "", email: "", password: "" });
      setLoading(false);
    }
  };

  const closeSuccessPopup = () => {
    setSuccessPopup({ ...successPopup, open: false });
  };

  const closeErrorPopup = () => {
    setErrorPopup({ ...errorPopup, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CustomLoader loading={loading} />
      <CustomPopup
        open={successPopup.open}
        type="success"
        content={successPopup.content}
        onClose={closeSuccessPopup}
      />
      <CustomPopup
        open={errorPopup.open}
        type="error"
        content={errorPopup.content}
        onClose={closeErrorPopup}
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DynamicTextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

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
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
