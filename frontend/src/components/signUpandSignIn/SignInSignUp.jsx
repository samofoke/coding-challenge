import React from "react";
import { Container, Grid } from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const SignInSignUp = () => {
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 8 }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={6}>
          <SignIn />
        </Grid>
        <Grid item xs={12} md={6}>
          <SignUp />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInSignUp;
