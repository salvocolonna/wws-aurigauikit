import React from 'react'
import './leaflet.css'

import { Map, TileLayer } from 'react-leaflet'

class MapWrapper extends React.Component {
  static defaultProps = {
    center: { lat: 42.074, lng: 12.568 },
    zoom: 6,
    maxZoom: 20
  }

  render() {
    const { innerRef, center, zoom, children, maxZoom,...props } = this.props
    return (
      <Map ref={innerRef} center={[center.lat, center.lng]} zoom={zoom} maxZoom={maxZoom} {...props}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </Map>
    )
  }
}

export default React.forwardRef((props, ref) => <MapWrapper innerRef={ref} {...props}/>)

export async function nominatim(search, use) {
  //TODO: stop if query is empty
  const osm = await fetch(
    `https://nominatim.openstreetmap.org/search?street=${search.street}&city=${
      search.city
    }&postalcode=${search.postcode}&format=json&addressdetails=1`
  )
  const result = await osm.json()
  return use(result, osm.status)
}
