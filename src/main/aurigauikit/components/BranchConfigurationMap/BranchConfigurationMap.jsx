import React from 'react'
import { FormattedMessage } from 'react-intl'
import Map, { Marker, nominatim } from 'aurigauikit/components/Maps'
import Address from './components/Address/Address'
import AddressElement from './components/Address/AddressElement'
import AddressModal from './components/AddressModal'
import Card from 'aurigauikit/components/Card'
import './branch-configuration-map.less'

class BranchConfigurationMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      branchCode: props.branchCode != null ? props.branchCode : '',
      branchDesc: props.branchDesc != null ? props.branchDesc : '',
      latitude: props.latitude != null ? props.latitude : '',
      longitude: props.longitude != null ? props.longitude : '',
      address1: props.address1 != null ? props.address1 : '',
      address2: props.address2 != null ? props.address2 : '',
      address3: props.address3 != null ? props.address3 : '',
      address4: props.address4 != null ? props.address4 : '',
      address5: props.address5 != null ? props.address5 : '',
      postalCode: props.postalCode != null ? props.postalCode : '',
      city: props.city != null ? props.city : '',
      country: props.country != null ? props.country : '',
      addressModalVisible: false,
      addressList: [],
      error: false,
      mode: this.props.mode,
    }
    this.initState = {
      branchCode: props.branchCode || '',
      branchDesc: props.branchDesc || '',
      latitude: props.latitude || '',
      longitude: props.longitude || '',
      address1: props.address1 || '',
      address2: props.address2 || '',
      address3: props.address3 || '',
      address4: props.address4 || '',
      address5: props.address5 || '',
      postalCode: props.postalCode || '',
      city: props.city || '',
      country: props.country || '',
    }
    this.checkCoordinates()
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        branchCode: nextProps.branchCode != null ? nextProps.branchCode : '',
        branchDesc: nextProps.branchDesc != null ? nextProps.branchDesc : '',
        latitude: nextProps.latitude != null ? nextProps.latitude : '',
        longitude: nextProps.longitude != null ? nextProps.longitude : '',
        address1: nextProps.address1 != null ? nextProps.address1 : '',
        address2: nextProps.address2 != null ? nextProps.address2 : '',
        address3: nextProps.address3 != null ? nextProps.address3 : '',
        address4: nextProps.address4 != null ? nextProps.address4 : '',
        address5: nextProps.address5 != null ? nextProps.address5 : '',
        postalCode: nextProps.postalCode != null ? nextProps.postalCode : '',
        city: nextProps.city != null ? nextProps.city : '',
        country: nextProps.country != null ? nextProps.country : '',
      },
      this.checkCoordinates
    )
  }

  checkCoordinates() {
    if (
      this.state.latitude == null ||
      this.state.latitude === '' ||
      this.state.longitude == null ||
      this.state.longitude === ''
    ) {
      this.geocode()
    }
  }

  geocode() {
    const { address1, address4, address5, city, postalCode, country } = this.state

    nominatim(
      {
        street: address1,
        city: city,
        postalcode: postalCode,
        county: address4,
        state: address5,
        country: country,
      },
      (results, status) => {
        if (status === 200 && results) {
          results = results
            .filter(a => a.address.street || a.address.road)
            .map(a => this.convertAddress(a))
          if (results.length === 1) {
            this.setAddress(results[0])
          } else {
            this.showAddressModal(results)
          }
        } else {
          this.showErrorModal()
        }
      }
    )
  }

  convertAddress(obj) {
    if (!obj.address.street && !obj.address.road) return null
    return {
      place_id: obj.place_id,
      latitude: obj.lat,
      longitude: obj.lon,
      address1: obj.address.street || obj.address.road,
      houseNumber: obj.address.house_number,
      address4: obj.address.county,
      address5: obj.address.state,
      postalCode: obj.address.postcode,
      city: obj.address.town || obj.address.village || obj.address.city,
      country: obj.address.country_code.toUpperCase(),
      addressModalVisible: false,
    }
  }

  setAddress(place_id) {
    if (!place_id) return
    const newAddress = this.state.addressList.find(address => address.place_id === place_id)
    if (newAddress) {
      this.setState({ ...newAddress, addressModalVisible: false }, () =>
        this.props.onAddressChange(newAddress)
      )
    }
  }

  showErrorModal() {
    this.setState({
      addressModalVisible: true,
      error: true,
    })
  }

  showAddressModal(results) {
    this.setState({
      addressModalVisible: true,
      addressList: results,
    })
  }

  reset() {
    this.setState({ ...this.initState }, () => this.props.onAddressChange(this.state))
  }

  render() {
    return (
      <Card>
        <div className={'grid branch-configuration__grid'}>
          <div className="col-2-3">
            <div className="branch-configuration__map">
              <Map center={{ lat: this.state.latitude, lng: this.state.longitude }} zoom={14}>
                <Marker
                  position={{
                    lat: this.state.latitude,
                    lng: this.state.longitude,
                  }}
                />
              </Map>
            </div>
          </div>
          <div className="col-1-3" style={{ padding: '20px' }}>
            <Address>
              <AddressElement text="branch-configuration-page.address-label.code">
                <input
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  value={this.state.branchCode}
                  onChange={e => this.setState({ branchCode: e.target.value })}
                />
              </AddressElement>
              <AddressElement text="branch-configuration-page.address-label.desc">
                <input
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  value={this.state.branchDesc}
                  onChange={e => this.setState({ branchDesc: e.target.value })}
                />
              </AddressElement>
              <AddressElement text="branch-configuration-page.address-label.line1">
                <input
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  value={this.state.address1}
                  onChange={e => this.setState({ address1: e.target.value })}
                />
              </AddressElement>
              <AddressElement text="branch-configuration-page.address-label.line2">
                <input
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  value={this.state.address2}
                  onChange={e => this.setState({ address2: e.target.value })}
                />
              </AddressElement>
              <AddressElement text="branch-configuration-page.address-label.line3">
                <input
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  value={this.state.address3}
                  onChange={e => this.setState({ address3: e.target.value })}
                />
              </AddressElement>
              <AddressElement text="branch-configuration-page.address-label.line4">
                <input
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  value={this.state.address4}
                  onChange={e => this.setState({ address4: e.target.value })}
                />
              </AddressElement>
              <AddressElement text="branch-configuration-page.address-label.line5">
                <input
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  value={this.state.address5}
                  onChange={e => this.setState({ address5: e.target.value })}
                />
              </AddressElement>
              <AddressElement text="branch-configuration-page.address-label.postal-code">
                <input
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  value={this.state.postalCode}
                  onChange={e => this.setState({ postalCode: e.target.value })}
                />
              </AddressElement>
              <AddressElement text="branch-configuration-page.address-label.city">
                <input
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  value={this.state.city}
                  onChange={e => this.setState({ city: e.target.value })}
                />
              </AddressElement>
              <AddressElement text="branch-configuration-page.address-label.country">
                <input
                  style={{ width: '100%' }}
                  disabled={this.props.disabled}
                  value={this.state.country}
                  onChange={e => this.setState({ country: e.target.value })}
                />
              </AddressElement>
            </Address>
            {this.props.mode !== 'view' && !this.props.hiddenButtons && (
              <div style={{ marginTop: '10px', float: 'right' }}>
                <button
                  style={{ marginRight: '10px' }}
                  className="btn btn-warning-outline"
                  onClick={() => this.reset()}
                >
                  <FormattedMessage id="reset" />
                </button>
                <button className="btn btn-primary-outline" onClick={() => this.geocode()}>
                  <FormattedMessage id="apply" />
                </button>
              </div>
            )}
          </div>
          <AddressModal
            show={this.state.addressModalVisible}
            data={this.state.addressList}
            onClose={() =>
              this.setState({
                addressModalVisible: false,
                addressList: [],
                error: false,
              })
            }
            onSelect={selectedPlaceId => this.setAddress(selectedPlaceId)}
            error={this.state.error}
          />
        </div>
      </Card>
    )
  }
}

export default BranchConfigurationMap
