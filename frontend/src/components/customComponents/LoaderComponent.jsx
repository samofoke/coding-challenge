import React from "react";
import { CircularProgress } from "@mui/material";

const CustomLoader = ({ loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default CustomLoader;
