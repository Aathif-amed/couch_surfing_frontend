import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import React from 'react'
import { useControl } from 'react-map-gl';
import { useValue } from '../../../context/ContextProvider'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
function Geocoder() {
    const {dispatch}=useValue();
    const control =new MapboxGeocoder({
        accessToken:process.env.REACT_APP_MAPBOX_TOKEN,
        marker:false,
        collapsed:true
    })
    useControl(()=>control)
    control.on('result',(event)=>{
        const coords= event.result.geometry.coordinates
        dispatch({type:'UPDATE_LOCATION',payload:{
            longitude: coords[0],
            latitude: coords[1]
        }})
    })
  return (
    <div>Geocoder</div>
  )
}

export default Geocoder