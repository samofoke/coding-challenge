import React from "react";
import { CircularProgress } from "@mui/material";

const CustomLoader = ({ loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    >
      <CircularProgress style={{ color: "#CDFADB" }} />
    </div>
  );
};

export default CustomLoader;
