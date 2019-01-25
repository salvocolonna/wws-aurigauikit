import React from "react"
import { withGoogleMap, GoogleMap, withScriptjs } from "react-google-maps"
import { compose, withProps } from "recompose"
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer"

const INSTANCE = "__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED"

const withMapProps = withProps({
  containerElement: <div style={{ height: "100%" }} />,
  mapElement: <div style={{ height: "100%" }} />,
  loadingElement: (
    <div
      style={{
        color: "rgb(233, 128, 54)",
        fontWeight: 600,
        fontSize: 20,
        padding: 20
      }}>
      Loading...
    </div>
  )
})

function getBoundsZoomLevel(bounds, { width, height }) {
  const WORLD_DIM = { height: 256, width: 256 }
  const ZOOM_MAX = 21

  function latRad(lat) {
    const sin = Math.sin((lat * Math.PI) / 180)
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2
  }

  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2)
  }

  const ne = bounds.getNorthEast()
  const sw = bounds.getSouthWest()

  const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI

  const lngDiff = ne.lng() - sw.lng()
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360

  const latZoom = zoom(height, WORLD_DIM.height, latFraction)
  const lngZoom = zoom(width, WORLD_DIM.width, lngFraction)

  return Math.min(latZoom, lngZoom, ZOOM_MAX)
}

const Offline = () => (
  <div
    style={{
      color: "rgb(233, 128, 54)",
      fontWeight: 600,
      fontSize: 20,
      padding: 20
    }}>
    No internet connection. Refresh
  </div>
)

const withGoogle = Component => props => {
  const Online = window.navigator.onLine && Component
  const Map = Online ? Online : () => Offline
  return <Map {...props} />
}

@compose(
  withMapProps,
  withScriptjs,
  withGoogle,
  withGoogleMap
)
class GoogleMaps extends React.Component {
  render() {
    const { onRef, children, ...props } = this.props
    const onMap = map => {
      if (map) {
        const instance = map.context[INSTANCE]
        const container = instance.getDiv()
        if (container) {
          let width = container.offsetWidth
          let height = container.offsetHeight
          map.setZoom = zoom => instance.setZoom(zoom)
          map.getFittingBounds = bounds => {
            if (container.offsetWidth !== 0) width = container.offsetWidth
            if (container.offsetHeight !== 0) height = container.offsetHeight
            const boundsCenter = bounds.getCenter()
            return {
              zoom: getBoundsZoomLevel(bounds, { width, height }),
              center: { lat: boundsCenter.lat(), lng: boundsCenter.lng() }
            }
          }
          onRef && onRef(map)
        }
      }
    }
    return (
      <GoogleMap {...props} ref={onMap}>
        {children}
      </GoogleMap>
    )
  }
}

export const createURL = ({ apiKey, version, lang }) =>
  `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=${version}&language=${lang}&region=${lang.toUpperCase()}&libraries=geometry,drawing,places`

export default url => {
  return class extends React.Component {
    state = { error: false }
    componentDidCatch() {
      this.setState({ error: true })
    }
    render() {
      return this.state.error ? <Offline /> : <GoogleMaps {...this.props} googleMapURL={url} />
    }
  }
}

export { MarkerClusterer }
export * from "react-google-maps"
