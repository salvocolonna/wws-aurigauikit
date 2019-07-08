import React from 'react'
import { FormattedMessage } from 'react-intl'

import Modal from 'aurigauikit/components/Modal'
import AddressTable from './AddressTable'

class AddressModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedPlaceId: this.props.data.length !== 0 ? this.props.data[0].place_id : null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedPlaceId: nextProps.data.length !== 0 ? nextProps.data[0].place_id : null,
    })
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onClose={() => this.setState({ addressModalVisible: false, addressList: [] })}
      >
        <section>
          {!this.props.error && (
            <Modal.Header
              title={<FormattedMessage id="branch-configuration-page.address-modal.title" />}
            />
          )}
          <Modal.Content>
            {!this.props.error && (
              <AddressTable
                data={this.props.data}
                selectedPlaceId={this.state.selectedPlaceId}
                onSelectionChange={selectedPlaceId => this.setState({ selectedPlaceId })}
              />
            )}
            {this.props.error && (
              <span style={{ fontSize: '2em', color: '#DC402B' }}>
                <FormattedMessage id="branch-configuration-page.address-modal.error" />
              </span>
            )}
          </Modal.Content>
          <Modal.Footer>
            <div className="btn-group">
              <button
                className="btn btn-warning-outline"
                style={{ marginRight: '20px' }}
                onClick={() => this.props.onClose()}
              >
                <FormattedMessage
                  id={
                    'branch-configuration-page.address-modal.button-' +
                    (this.props.error ? 'error-ok' : 'cancel')
                  }
                />
              </button>
              {!this.props.error && (
                <button
                  className="btn btn-confirmatory"
                  onClick={() => this.props.onSelect(this.state.selectedPlaceId)}
                >
                  <FormattedMessage id="branch-configuration-page.address-modal.button-confirm" />
                </button>
              )}
            </div>
          </Modal.Footer>
        </section>
      </Modal>
    )
  }
}

export default AddressModal
