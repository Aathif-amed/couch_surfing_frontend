import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useValue } from "../../../context/ContextProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "./Geocoder";
function AddLocation() {
  const {
    state: {
      location: { longitude, latitude },
      currentUser,
    },
    dispatch,
  } = useValue();
  const mapRef = useRef();

  useEffect(() => {
    const storedLocation = JSON.parse(
      localStorage.getItem(currentUser.id)
    )?.location;
    if (
      !longitude &&
      !latitude &&
      !storedLocation?.longitude &&
      !storedLocation?.latitude
    ) {
      fetch("https://ipapi.co/json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch({
            type: "UPDATE_LOCATION",
            payload: { longitude: data.longitude, latitude: data.latitude },
          });
        });
    }
  }, []);
  useEffect(() => {
    if ((longitude || latitude) && mapRef.current) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
      });
    }
  }, [longitude, latitude]);
  return (
    <Box
      sx={{
        height: 400,
        position: "relative",
      }}
    >
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={latitude}
          longitude={longitude}
          draggable
          onDragEnd={(event) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: {
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
              },
            })
          }
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-right"
          trackUserLoaction
          onGeoLocate={(event) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: {
                longitude: event.coords.longitude,
                latitude: event.coords.latitude,
              },
            })
          }
        />
        <Geocoder />
      </ReactMapGL>
    </Box>
  );
}

export default AddLocation;
