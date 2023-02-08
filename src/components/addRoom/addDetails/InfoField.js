import { Check } from "@mui/icons-material";
import { Avatar, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { useValue } from "../../../context/ContextProvider";
import pendingIcon from "./icons/loading.svg";
let timer;
function InfoField({ mainProps, optionalProps = {}, minLength }) {
  const { dispatch } = useValue();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = (event) => {
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { [event.target.name]: event.target.value },
    });
    if (!editing) {
      setEditing(true);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      setEditing(false);
      if (event.target.value.length < minLength) {
        if (!error) {
          setError(true);
        }
        if (success) {
          setSuccess(false);
        }
      } else {
        if (error) {
          setError(false);
        }
        if (!success) {
          setSuccess(true);
        }
      }
    }, 500);
  };
  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      error={error}
      helperText={error && `This field must be ${minLength} characters or more`}
      color={success ? "success" : "primary"}
      variant="outlined"
      onChange={handleChange}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {editing ? (
              <Avatar src={pendingIcon} sx={{ height: 70 }}></Avatar>
            ) : (
              success && <Check color="success" />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}

export default InfoField;
