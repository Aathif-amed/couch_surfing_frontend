import { Group, MapsHomeWork } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import React, { useEffect } from "react";
import { getRooms } from "../../../actions/room";
import { getUsers } from "../../../actions/user";
import { useValue } from "../../../context/ContextProvider";
import RoomsCostChart from "./RoomsCostChart";
import RoomsUsersChart from "./RoomsUsersChart";

function Main({ setSelectedLink, link }) {
  const {
    state: { rooms, users, currentUser },
    dispatch,
  } = useValue();
  useEffect(() => {
    setSelectedLink(link);
    if (rooms.length === 0) {
      getRooms(dispatch);
    }
    if (users.length === 0) {
      getUsers(dispatch, currentUser);
    }
  }, []);
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "repeat(3,1fr)",
        gridAutoRows: "minmax(100px,auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Users</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{users.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Rooms</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{rooms.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={2} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
        <Box>
          <Typography> Recently added Users</Typography>
          <List>
            {users.slice(0, 4).map((user, index) => {
              return (
                <Box key={user._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        src={user?.photoURL}
                        alt={user?.fName + " " + user?.lName}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user?.fName + " " + user?.lName}
                      secondary={`Time Created: ${moment(
                        user?.createdAt
                      ).format("YYYY-MM-DD H:mm:ss")}`}
                    />
                  </ListItem>
                  {index !== 3 && <Divider variant="inset" />}
                </Box>
              );
            })}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography> Recently added Rooms</Typography>
          <List>
            {rooms.slice(0, 4).map((room, index) => {
              return (
                <Box key={room._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        src={room?.images[0]}
                        alt={room?.title}
                        variant="rounded"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={room?.title}
                      secondary={`Time Created: ${moment(
                        room?.createdAt
                      ).fromNow()}`}
                    />
                  </ListItem>
                  {index !== 3 && <Divider variant="inset" />}
                </Box>
              );
            })}
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <RoomsCostChart />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <RoomsUsersChart />
      </Paper>
    </Box>
  );
}

export default Main;
