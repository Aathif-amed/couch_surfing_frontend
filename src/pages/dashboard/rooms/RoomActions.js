import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { clearRoom, deleteRoom } from "../../../actions/room";
import { useValue } from "../../../context/ContextProvider";

function RoomActions({ params }) {
  const { _id, longitude, latitude, price, title, description, images, uid } =
    params.row;
  const {
    state: { currentUser, updatedRoom, addedImages, images: newImages },
    dispatch,
  } = useValue();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (updatedRoom) {
      clearRoom(dispatch, currentUser, addedImages, updatedRoom);
    } else {
      clearRoom(dispatch, currentUser, newImages);
    }
    dispatch({ type: "UPDATE_LOCATION", payload: { longitude, latitude } });
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { price, title, description },
    });
    dispatch({ type: "UPDATE_IMAGES", payload: images });
    dispatch({ type: "UPDATE_UPDATED_ROOM", payload: { _id, uid } });
    dispatch({ type: "UPDATE_SECTION", payload: 2 });
    navigate("/");
  };

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
        <IconButton onClick={handleEdit}>
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
