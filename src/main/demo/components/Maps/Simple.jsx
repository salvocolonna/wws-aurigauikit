import React from "react"
import Map, { Marker, Popup,MarkerClusterGroup } from "aurigauikit/components/Maps"
import Select2 from "aurigauikit/components/Select2"
import { latLngBounds } from "leaflet"
const data = [1, 2]
export default class extends React.Component {
  mapRef = React.createRef()
  state = {
    markers: [],
    count: 0,
    selected: data[0]
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(
        {
          markers: [{ lat: 50, lng: -18 }, { lat: 51, lng: -18 }, { lat: 52, lng: -18 }]
        },
        () => {
          const { leafletElement } = this.mapRef.current
          leafletElement.fitBounds(this.getBounds())
        }
      )
    }, 1000)

    setTimeout(() => {
      this.setState({
        markers: [{ lat: 50, lng: -18 }, { lat: 51, lng: -17 }, { lat: 52, lng: -16 }]
      })
    }, 10000)
  }

  getBounds = () => {
    const { markers } = this.state
    const bounds = latLngBounds()
    markers.forEach(p => bounds.extend([p.lat, p.lng]))
    return bounds
  }

  count = () => this.setState(({ count }) => ({ count: count + 1 }))

  select = selected => this.setState({ selected })

  render() {
    const { markers, count, selected } = this.state
    return (
      <React.Fragment>
        <Select2 style={{ width: 150 }} data={data} value={selected} didSelect={this.select} />
        <Map ref={this.mapRef}>
          <MarkerClusterGroup>
            {markers.map((position, i) => (
              <Marker key={i} position={position}>
                <Popup>
                  <div style={{ pointerEvents: "all" }}>
                    <Select2
                      style={{ width: "200px" }}
                      data={data}
                      value={selected}
                      didSelect={this.select}
                    />
                    <button onClick={this.count}>{i + count}</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </Map>
      </React.Fragment>
    )
  }
}
