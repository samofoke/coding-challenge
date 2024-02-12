import React from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";

const CustomPopup = ({ open, handleClose, severity, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        ></IconButton>
      </Alert>
    </Snackbar>
  );
};

export default CustomPopup;
