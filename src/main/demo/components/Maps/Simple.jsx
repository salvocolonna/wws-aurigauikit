import React from 'react'
import Map, { Marker, Popup, MarkerClusterGroup, InfoWindow } from 'aurigauikit/components/Maps'
import Select2 from 'aurigauikit/components/Select2'
import { latLngBounds } from 'leaflet'
import { useState } from 'react'
import { useEffect } from 'react'

const markers = [{ lat: 50, lng: -18 }, { lat: 51, lng: -18 }, { lat: 52, lng: -18 }]

const fetchMarkers = () => new Promise(r => setTimeout(() => r(markers), 200))

export default () => {
  const [markers, setMarkers] = useState([])
  useEffect(() => {
    fetchMarkers().then(setMarkers)
  }, [])
  return (
    <Map>
      <MarkerClusterGroup>
        {markers.map((position, i) => (
          <Marker key={i} position={position}>
            <Popup>
              <InfoWindow>
                <div
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#fafafa',
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Info
                </div>
              </InfoWindow>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </Map>
  )
}
