import React from "react";
import { Button, CircularProgress } from "@mui/material";

const CustomButton = ({
  loading,
  variant,
  color,
  size,
  onClick,
  disabled,
  children,
  startIcon,
  endIcon,
  ...otherProps
}) => {
  return (
    <Button
      variant={variant || "contained"}
      color={color || "primary"}
      size={size || "medium"}
      onClick={onClick}
      disabled={loading || loading}
      startIcon={startIcon}
      endIcon={!loading && endIcon}
      {...otherProps}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </Button>
  );
};

export default CustomButton;
