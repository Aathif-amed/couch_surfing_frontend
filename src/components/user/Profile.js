import React, { useRef } from "react";
import { useValue } from "../../context/ContextProvider";
import {
    Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import { updateProfile } from "../../actions/user";
function Profile() {
  const {
    state: { profile, currentUser },
    dispatch,
  } = useValue();
  const fNameRef = useRef();
  const lNameRef = useRef();
  const handleClose = () => {
    dispatch({ type: "UPDATE_PROFILE", payload: { ...profile, open: false } });
  };
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { ...profile, file, photoURL },
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const fName=fNameRef.current.value
    const lName=lNameRef.current.value
    updateProfile(currentUser,{fName,lName,file:profile.file},dispatch)
  };

  return (
    <Dialog open={profile.open} onClose={handleClose}>
      <DialogTitle>
        Profile
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            You can update your profile by updating by these fields:
          </DialogContentText>

          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="fName"
            label="First Name"
            type="text"
            fullWidth
            inputRef={fNameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={currentUser?.fName}
          />
          <TextField
            margin="normal"
            variant="standard"
            id="lName"
            label="Last Name"
            type="text"
            fullWidth
            inputRef={lNameRef}
            defaultValue={currentUser?.lName}
          />
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
            src={profile?.photoURL}
            sx={{width:75,height:75,cursor:'pointer'}}
            ></Avatar>
          </label>
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default Profile;
