import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import React, { useEffect } from "react";
import { useValue } from "../../context/ContextProvider";

const control = new MapboxGeocoder({
  marker: false,
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

//this component is used to inject our search component into sidebar
function GeocoderInput() {
  const { mapRef, containerRef, dispatch } = useValue();
  useEffect(() => {
    if (containerRef?.current?.children[0]) {
      containerRef.current.removeChild(containerRef.current.children[0]);
    }
    //the searched area in the map by setting mapRef value and by the dispatch function on line 20
    containerRef.current.appendChild(control.onAdd(mapRef.current.getMap()));

    control.on("result", (event) => {
      const coords = event.result.geometry.coordinates;
      dispatch({
        type: "ADDRESS_FILTER",
        payload: {
          longitude: coords[0],
          latitude: coords[1],
        },
      });
    });
    control.on("clear", () => {
      dispatch({
        type: "CLEAR_ADDRESS_FILTER",
      });
    });
  }, []);
  return null;
}

export default GeocoderInput;
