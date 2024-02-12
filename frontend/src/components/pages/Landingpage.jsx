import React from "react";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import myImage from "../../images/4505780.jpg";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleSignInUpClick = () => {
    navigate("/sign");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: 2, md: 3 },
        mt: { xs: 10, md: 8 },
        [theme.breakpoints.up("md")]: {
          padding: "80px",
          mt: "88px",
        },
      }}
    >
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{ animation: "fadeIn 2s", mb: 2 }}
          >
            Welcome to the world of NFTs!
          </Typography>
          <Typography variant={isMobile ? "body2" : "body1"} sx={{ mb: 3 }}>
            Discover the amazing world of our products and services.
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignInUpClick}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSignInUpClick}
            >
              Sign Up
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
          }}
        >
          <img
            src={myImage}
            alt="Descriptive Alt Text"
            style={{ maxWidth: "80%", height: "auto", borderRadius: "50%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
