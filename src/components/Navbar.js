import { Lock, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useValue } from "../context/ContextProvider";

import UserIcons from "./user/UserIcons";


function Navbar() {
  const {
    state: { currentUser },
    dispatch
  } = useValue();
  return (
    <AppBar maxwidth="lg">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ mx: 1 }}>
            <IconButton size="large" color="inherit">
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            You Are Welcome
          </Typography>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Welcome..!
          </Typography>
          {!currentUser ? (
            <Button color="inherit" startIcon={<Lock />} onClick={()=>{dispatch({type:'OPEN_LOGIN'})}}>
              Login
            </Button>
          ) : (
            <UserIcons />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
