import React from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import LandingPage from "./components/pages/Landingpage";

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />
      <Box component="main" flexGrow={1}>
        <Routes>
          <Route index element={<LandingPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
