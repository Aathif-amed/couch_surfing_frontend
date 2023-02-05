import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

function PasswordField({ passwordRef, id = "password", label = "Password" }) {
  const [showPassword, setShowPasword] = useState(false);

  const handleClick = () => {
    setShowPasword(!showPassword);
  };
  const handleMouseDown = (event) => {
    event.preventDefault();
  };
  return (
    <TextField
      margin="normal"
      variant="standard"
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      fullWidth
      inputRef={passwordRef}
      inputProps={{ minLength: 6 }}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordField;
