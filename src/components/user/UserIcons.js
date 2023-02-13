import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useValue } from "../../context/ContextProvider";
import CheckUserToken from "../../hooks/CheckUserToken";
import UserMenu from "./UserMenu";

function UserIcons() {
  CheckUserToken();

  const {
    state: { currentUser },
  } = useValue();

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  return (
    <Box>
      <Tooltip title="Open User Settings">
        <IconButton
          onClick={(e) => {
            setAnchorUserMenu(e.currentTarget);
          }}
        >
          <Avatar src={currentUser?.photoURL} alt={currentUser?.fName}>
            {currentUser?.fName?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  );
}

export default UserIcons;
