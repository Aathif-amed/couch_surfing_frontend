import { StarBorder } from "@mui/icons-material";
import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";

function Room() {
  const {
    state: { filteredRooms },
  } = useValue();
  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))!important",
        }}
      >
        {filteredRooms.map((room) => {
          return (
            <Card key={room._id}>
              <ImageListItem sx={{ height: "100% !important" }}>
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom,rgba(0,0,0,0.7)0%,rgba(0,0,0,0.3)70%,rgba(0,0,0,0)100%)",
                  }}
                  title={room.price === 0 ? "Free Stay " : "₹" + room.price}
                  actionIcon={
                    <Tooltip title={room?.uName} sx={{ mr: "5px" }}>
                      <Avatar src={room?.uPhoto}>
                        {room?.uFname?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  }
                  position="top"
                />
                <img
                  src={room.images[0]}
                  alt={room.title}
                  loading="lazy"
                  style={{ cursor: "pointer" }}
                />
                <ImageListItemBar
                  title={room.title}
                  actionIcon={
                    <Rating
                      sx={{ color: "rgba(255,255,255,0.8)", mr: "5px" }}
                      name="room-rating"
                      defaultValue={2.5}
                      precision={0.5}
                      emptyIcon={
                        <StarBorder sx={{ color: "rgba(255,255,255,0.8" }} />
                      }
                    />
                  }
                />
              </ImageListItem>
            </Card>
          );
        })}
      </ImageList>
    </Container>
  );
}

export default Room;