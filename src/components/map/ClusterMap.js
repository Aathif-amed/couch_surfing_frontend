import React, { useEffect, useState } from "react";
import { getRooms } from "../../actions/room";
import { useValue } from "../../context/ContextProvider";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Supercluster from "supercluster";
import "./cluster.css";
import { Avatar, Paper, Tooltip } from "@mui/material";
import GeocoderInput from "../sidebar/GeocoderInput";
import PopupRoom from "./PopupRoom";

const superCluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

function ClusterMap() {
  const {
    state: { filteredRooms },
    dispatch,
    mapRef,
  } = useValue();
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    getRooms(dispatch);
  }, []);
  useEffect(() => {
    const points = filteredRooms.map((room) => ({
      type: "Feature",
      properties: {
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        longitude: room.longitude,
        latitude: room.latitude,
        images: room.images,
        uPhoto: room.uPhoto,
        uFname: room.uFname,
        uLname: room?.uLname,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(room.longitude), parseFloat(room.latitude)],
      },
    }));
    setPoints(points);
  }, [filteredRooms]);
  useEffect(() => {
    superCluster.load(points);
    setClusters(superCluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);
  useEffect(() => {
    if (mapRef.current) {
      //map and bounds are two objects converting them into array and merging them into single array using flat
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);
  return (
    <ReactMapGL
      initialViewState={{ latitude: 20.5937, longitude: 78.9629 }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      //below function setzoom will force the setclusters function because of the useEffect in line 48
      onZoomEnd={(event) => setZoom(Math.round(event.viewState.zoom))}
    >
      {clusters.map((cluster) => {
        const { cluster: isCluster, point_count } = cluster.properties;
        const [longitude, latitude] = cluster.geometry.coordinates;
        //only if its a cluster otherwise it returns singleroom or point
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              <div
                className="cluster-marker"
                style={{
                  //depends on the number of rooms
                  width: `${10 + (point_count / points.length) * 20}px`,
                  height: `${10 + (point_count / points.length) * 20}px`,
                }}
                onClick={() => {
                  //zoom is equal to either the value returned by superCluster or 20, whichever is smaller to the zoom level of map
                  const zoom = Math.min(
                    superCluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
                {point_count}
              </div>
            </Marker>
          );
        }
        return (
          <Marker
            key={`cluster-${cluster.properties.roomId}`}
            longitude={longitude}
            latitude={latitude}
          >
            <Tooltip
              title={
                cluster.properties.uFname + " " + cluster.properties?.uLname
              }
            >
              <Avatar
                src={cluster.properties.uPhoto}
                component={Paper}
                elevation={2}
                onClick={() => setPopupInfo(cluster.properties)}
              ></Avatar>
            </Tooltip>
          </Marker>
        );
      })}
      <GeocoderInput />
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          maxWidth="auto"
          closeOnClick={false}
          focusAfterOpen={false}
          onClose={() => setPopupInfo(null)}
        >
          <PopupRoom {...{ popupInfo }} />
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default ClusterMap;
