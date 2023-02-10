import { Close, StarBorder } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Dialog,
  IconButton,
  Rating,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useValue } from "../../context/ContextProvider";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Zoom, Lazy } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/lazy";
import "swiper/css/zoom";
import "./swiper.css";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" {...props} ref={ref} />;
});

function Room() {
  const {
    state: { room },
    dispatch,
  } = useValue();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (room) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${room.longitude},${room.latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          return setPlace(data.features[0]);
        });
    }
  }, [room]);
  const handleClose = () => {
    dispatch({ type: "UPDATE_ROOM", payload: null });
  };
  return (
    <Dialog
      fullScreen
      open={Boolean(room)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {room?.title}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5 }}>
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={1.5}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {room?.images?.map((url) => (
            <SwiperSlide key={url}>
              <div className="swiper-zoom-container">
                <img src={url} alt="room" />
              </div>
            </SwiperSlide>
          ))}
          <Tooltip
            title={room?.uFname + " " + room?.uLname || ""}
            sx={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              zIndex: 2,
            }}
          >
            <Avatar src={room?.uPhoto} />
          </Tooltip>
        </Swiper>
        <Stack sx={{ p: 3 }} spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {"Price Per Night:"}
              </Typography>
              <Typography component="span">
                {room?.price === 0 ? "Free Stay" : " ₹" + room?.price}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="span">
                {"Ratings:"}
              </Typography>
              <Rating
                name="room-ratings"
                defaultValue={2.5}
                precision={0.5}
                emptyIcon={<StarBorder />}
              ></Rating>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {"Place Name: "}
              </Typography>
              <Typography component="span">{place?.text}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {"Address: "}
              </Typography>
              <Typography component="span">{place?.place_name}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Typography variant="h6" component="span">
              {"Details: "}
            </Typography>
            <Typography component="span">{room?.description}</Typography>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
}

export default Room;
