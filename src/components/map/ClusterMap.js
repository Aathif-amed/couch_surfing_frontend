import React, { useEffect, useState } from "react";
import { getRooms } from "../../actions/room";
import { useValue } from "../../context/ContextProvider";
import ReactMapGL, { Marker } from "react-map-gl";
import Supercluster from "supercluster";
import "./cluster.css";
import { Avatar, Paper, Tooltip } from "@mui/material";

const superCluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

function ClusterMap() {
  const {
    state: { rooms },
    dispatch,
    mapRef,
  } = useValue();
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    getRooms(dispatch);
  }, []);
  useEffect(() => {
    const points = rooms.map((room) => ({
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
  }, [rooms]);
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
      initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
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
              ></Avatar>
            </Tooltip>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}

export default ClusterMap;
