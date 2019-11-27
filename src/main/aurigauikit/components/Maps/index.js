import React, { useMemo } from 'react'
import Map from './OpenStreetMap'
import { latLngBounds } from 'leaflet'
import { Popup } from 'react-leaflet'
import 'react-leaflet-markercluster/dist/styles.min.css'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import Marker from './Marker'
export const InfoWindow = props => <div className="leaflet-infowindow">{props.children}</div>

export { Popup, Marker, MarkerClusterGroup, latLngBounds }
export { nominatim } from './OpenStreetMap'
export default Map
