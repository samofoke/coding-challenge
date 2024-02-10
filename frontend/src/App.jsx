import React from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import LandingPage from "./components/pages/Landingpage";
import SignInSignUp from "./components/signUpandSignIn/SignInSignUp";
import AuthProvider from "./components/context/AuthUseContext";
import UserProfileView from "./components/pages/UserProfle";

function App() {
  return (
    <AuthProvider>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <NavBar />
        <Box component="main" flexGrow={1}>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/sign" element={<SignInSignUp />} />
            <Route path="/profile/:userId" element={<UserProfileView />} />
          </Routes>
        </Box>
      </Box>
    </AuthProvider>
  );
}

export default App;
