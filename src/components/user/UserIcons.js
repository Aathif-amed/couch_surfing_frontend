import { Mail, Notifications } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useValue } from "../../context/ContextProvider";
import CheckGUserToken from "../../hooks/CheckGUserToken";
import UserMenu from "./UserMenu";

function UserIcons() {
  CheckGUserToken();

  const {
    state: { currentUser },
  } = useValue();

  const [anchorUserMenu, setAnchorUserMenu ]= useState(null)
  return (
    <Box>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={5}>
          <Mail></Mail>
        </Badge>
      </IconButton>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={5}>
          <Notifications></Notifications>
        </Badge>
      </IconButton>
      <Tooltip title="Open User Settings">
        <IconButton onClick={(e)=>{setAnchorUserMenu(e.currentTarget)}}>
          <Avatar src={currentUser?.photoURL} alt={currentUser?.fName}>
            {currentUser?.fName?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{anchorUserMenu,setAnchorUserMenu}}/>
    </Box>
  );
}

export default UserIcons;
