import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { deleteRoom } from "../../../actions/room";
import { useValue } from "../../../context/ContextProvider";

function RoomActions({ params }) {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  return (
    <Box>
      <Tooltip title="View Room">
        <IconButton
          onClick={() => dispatch({ type: "UPDATE_ROOM", payload: params.row })}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Room">
        <IconButton onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Room">
        <IconButton
          onClick={() => deleteRoom(params.row, currentUser, dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default RoomActions;
