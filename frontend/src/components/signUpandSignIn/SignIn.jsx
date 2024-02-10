// SignIn.jsx
import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, Container } from "@mui/material";
import DynamicTextField from "../TextField.jsx/TextFieldComponent";
import CustomLoader from "../customComponents/LoaderComponent";
import CustomPopup from "../customComponents/PopupComponent";
import CustomButton from "../customComponents/CustomButton";

const SignIn = () => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        formData
      );
      console.log(response);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setSuccessPopup({ open: true, content: response.data.message });

      //reset the form
      setFormData({ email: "", password: "" });
    } catch (error) {
      setErrorPopup({
        open: true,
        content: error.response
          ? error.response.data.message
          : "Login user failed",
      });
    } finally {
      setFormData({ email: "", password: "" });
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
            variant="outlined"
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
