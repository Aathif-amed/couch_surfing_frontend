import { Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ReactMapGL, { GeolocateControl,Marker, NavigationControl } from 'react-map-gl'
import { useValue } from '../../../context/ContextProvider'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocoder from './Geocoder'
function AddLocation() {
  const {state:{location:{longitude,latitude}},dispatch}=useValue()
  const mapRef=useRef()

  useEffect(()=>{
    if(!longitude && !latitude){
      fetch('https://ipapi.co/json').then(response=>{
        return response.json()
      }).then(data=>{
        mapRef.current.flyTo({
          center:[data.longitude,data.latitude]
        })
        dispatch({type:'UPDATE_LOCATION',payload:{longitude:data.longitude,latitude:data.latitude}})
      })
    }
  },[])

  return (
   <Box
   sx={{
    height:400,
    position:'relative'
   }}>
    <ReactMapGL
    ref={mapRef}
    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    initialViewState={{
      longitude:longitude,
      latitude:latitude,
      zoom:8
    }}
    mapStyle='mapbox://styles/mapbox/streets-v11'
    >
    <Marker
    latitude={latitude}
    longitude={longitude}
    draggable
    onDragEnd={(event)=>dispatch({type:'UPDATE_LOCATION',payload:{longitude:event.lngLat.lng,latitude:event.lngLat.lat}})}
    />
    <NavigationControl position='bottom-right'/>
    <GeolocateControl
    position='top-right'
    trackUserLoaction
    onGeoLocate={(event)=>dispatch({type:'UPDATE_LOCATION',payload:{longitude:event.coords.longitude,latitude:event.coords.latitude}})}
    />
    <Geocoder/>
    </ReactMapGL>
   </Box>
  )
}

export default AddLocation