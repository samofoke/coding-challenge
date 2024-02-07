import React from "react";
import { TextField } from "@mui/material";

const DynamicTextField = ({
  label,
  name,
  value,
  onChange,
  sx,
  InputLabelProps,
  ...otherProps
}) => {
  const defaultStyles = {
    input: { color: "#FEFCF3" },
    "& label.Mui-focused": {
      color: "#FEFCF3",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FEFCF3",
      },
      "&:hover fieldset": {
        borderColor: "#FEFCF3",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#transparent",
      },
    },
    ...sx,
  };

  const defaultInputLabelProps = {
    style: { color: "#FEFCF3" },
    ...InputLabelProps,
  };

  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      sx={defaultStyles}
      InputLabelProps={defaultInputLabelProps}
      {...otherProps}
    />
  );
};

export default DynamicTextField;
