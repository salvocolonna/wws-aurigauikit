import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/server'
import L from 'leaflet'
import { Marker as OriginalMarker } from 'react-leaflet'
import SvgIcon from './SvgIcon'


const Marker = ({ color, ...props }) => {
  const icon = useMemo(() => {
    const iconUrl =
      'data:image/svg+xml;base64,' +
      btoa(
        ReactDOM.renderToStaticMarkup(
          <SvgIcon
            color={color}
          />
        )
      )
    return new L.Icon({
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      className: 'leaflet-icon',
    })
  })
  return (
    <OriginalMarker
      icon={icon}
      {...props}
      position={props.position && [props.position.lat, props.position.lng]}
    />
  )
}

export default Marker
