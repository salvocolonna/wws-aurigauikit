import React from 'react'
import Map from './OpenStreetMap'
import L from 'leaflet'
import { Marker as OriginalMarker, Popup } from 'react-leaflet'
import markerIcon from './images/marker-icon.png'
import 'react-leaflet-markercluster/dist/styles.min.css'

export const InfoWindow = (props)=> (
	<div className="leaflet-infowindow">
	{props.children}
	</div>
	)


const icon = new L.Icon({
	iconUrl: markerIcon,
	iconSize: [25, 41],
	iconAnchor: [12,41],
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	className: 'leaflet-icon'
})

const Marker = props => <OriginalMarker icon={icon} {...props} position={props.position && [props.position.lat, props.position.lng]} />

export { Popup, Marker }
export { nominatim } from './OpenStreetMap'
export default Map