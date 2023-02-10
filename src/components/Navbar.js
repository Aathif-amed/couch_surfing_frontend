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
import React, { useState } from "react";
import { useValue } from "../context/ContextProvider";
import SideBar from "./sidebar/SideBar";

import UserIcons from "./user/UserIcons";

function Navbar() {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ mx: 1 }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <Menu />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              Couch Surfing
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
              }}
            >
              CS
            </Typography>
            {!currentUser ? (
              <Button
                color="inherit"
                startIcon={<Lock />}
                onClick={() => {
                  dispatch({ type: "OPEN_LOGIN" });
                }}
              >
                Login
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <SideBar {...{ isOpen, setIsOpen }} />
    </>
  );
}

export default Navbar;
