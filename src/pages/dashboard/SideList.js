import React, { useMemo, useState } from "react";
import MuiDrawer from "@mui/material/Drawer";

import {
  Box,
  Divider,
  IconButton,
  List,
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Avatar,
  Typography,
} from "@mui/material";
import {
  ChevronLeft,
  Dashboard,
  KingBed,
  Logout,
  PeopleAlt,
} from "@mui/icons-material";
import { useValue } from "../../context/ContextProvider";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./main/Main";
import Users from "./users/Users";
import Rooms from "./rooms/Rooms";
import { storeRoom } from "../../actions/room";
import { logout } from "../../actions/user";
import CheckUserToken from "../../hooks/CheckUserToken";
import isAdmin from "./utils/isAdmin";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function SideList({ open, setOpen }) {
  CheckUserToken();
  const {
    state: {
      currentUser,
      location,
      details,
      images,
      updatedRoom,
      deletedImages,
      addedImages,
    },
    dispatch,
  } = useValue();
  const [selectedLink, setSelectedLink] = useState("");
  console.log(currentUser);
  const list = useMemo(
    () => [
      ...(isAdmin(currentUser)
        ? [
            {
              title: "Main",
              icon: <Dashboard />,
              link: "",
              component: <Main {...{ setSelectedLink, link: "" }} />,
            },
            {
              title: "Users",
              icon: <PeopleAlt />,
              link: "users",
              component: <Users {...{ setSelectedLink, link: "users" }} />,
            },
          ]
        : []),

      {
        title: "Rooms",
        icon: <KingBed />,
        link: "rooms",
        component: <Rooms {...{ setSelectedLink, link: "rooms" }} />,
      },
    ],
    []
  );

  const navigate = useNavigate();
  const handleLogout = () => {
    storeRoom(
      location,
      details,
      images,
      updatedRoom,
      deletedImages,
      addedImages,
      currentUser.id
    );
    logout(dispatch);
  };
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
          <Tooltip
            title={
              currentUser.google
                ? currentUser?.name
                : currentUser?.fName + " " + currentUser?.lName
            }
          >
            <Avatar
              src={currentUser?.photoURL}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          {open && (
            <Typography>
              {currentUser.google
                ? currentUser?.name
                : currentUser?.fName + " " + currentUser?.lName}
            </Typography>
          )}
          <Typography variant="body2">
            {currentUser?.role || "basic"}
          </Typography>
          {open && (
            <Typography variant="body2">{currentUser?.email}</Typography>
          )}
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
          <Route
            path="*"
            element={
              isAdmin(currentUser) ? (
                <Main {...{ setSelectedLink, link: "" }} />
              ) : (
                <Rooms {...{ setSelectedLink, link: "rooms" }} />
              )
            }
          />
        </Routes>
      </Box>
    </>
  );
}

export default SideList;
