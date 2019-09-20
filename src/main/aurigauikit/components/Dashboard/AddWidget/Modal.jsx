import React from 'react'
import { FormattedMessage as Msg, injectIntl } from 'react-intl'
import Modal from 'aurigauikit/components/Modal'
import Select2 from 'aurigauikit/components/Select2'
import { Grid, Div } from 'aurigauikit/components/Grid'
import messages from './messages'

const newId = { id: 'dashboard-page.add-widget.new' }

export default injectIntl(
  class extends React.Component {
    constructor(props) {
      super(props)
      const widget = this.props.widgets[0]
      this.state = { selectedWidget: widget ? widget.name : props.intl.formatMessage(newId) }
    }

    changeWidget = selectedWidget => {
      const { intl } = this.props
      return selectedWidget === intl.formatMessage(newId)
        ? this.setState({ selectedWidget: intl.formatMessage(newId) })
        : this.setState({ selectedWidget })
    }

    confirm = () => {
      const { onAdd } = this.props
      const { selectedWidget } = this.state
      const widget = this.props.widgets.find(widget => widget.name === selectedWidget)
      onAdd(widget)
    }

    getWidgets = () => {
      const { widgets, onBuild, intl } = this.props
      const widgetList = widgets
        .filter(({ name }) => name !== 'active-assets')
        .map(widget => widget.name)
      return onBuild ? [intl.formatMessage(newId), ...widgetList] : widgetList
    }

    render() {
      const { onClose, messages: widgetsMessages, intl } = this.props
      const { selectedWidget } = this.state
      const currentWidget = this.props.widgets.find(widget => widget.name === selectedWidget)
      return (
        <Modal show onClose={() => onClose()} style={{ width: '70%' }}>
          <Modal.Header title={<Msg {...messages.modal.title} />} />
          <Modal.Content>
            <Grid padding={20}>
              <Div col="1-2">
                <Select2
                  style={{ width: '100%' }}
                  data={this.getWidgets()}
                  value={selectedWidget}
                  didSelect={this.changeWidget}
                  willDisplay={name =>
                    widgetsMessages
                      ? widgetsMessages[name]
                        ? intl.formatMessage(widgetsMessages[name])
                        : name
                      : name
                  }
                />
              </Div>
            </Grid>
            {selectedWidget === intl.formatMessage(newId) ? (
              <this.props.onBuild />
            ) : (
              <div
                style={{
                  height: 500,
                  marginTop: 20,
                  marginBottom: 20,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {currentWidget.widget}
              </div>
            )}
          </Modal.Content>
          <Modal.Footer>
            <div className="btn-group">
              <button
                className="btn btn-warning-outline"
                onClick={() => onClose()}
                style={{ marginRight: '20px' }}
              >
                <Msg {...messages.modal.cancel} />
              </button>
              <button
                className="btn btn-confirmatory"
                onClick={this.confirm}
                style={{
                  display: selectedWidget === intl.formatMessage(newId) ? 'none' : 'inline-block',
                }}
              >
                <Msg {...messages.modal.confirm} />
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )
    }
  }
)
