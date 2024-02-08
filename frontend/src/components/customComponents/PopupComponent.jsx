import React from "react";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const CustomPopup = ({ open, type, content, onClose }) => {
  const alertStyles = {
    success: { backgroundColor: "#4caf50", color: "#fff" },
    warning: { backgroundColor: "#ff9800", color: "#fff" },
    error: { backgroundColor: "#f44336", color: "#fff" },
    info: { backgroundColor: "#2196f3", color: "#fff" },
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <SnackbarContent
        style={alertStyles[type]}
        message={<>{content}</>}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default CustomPopup;
