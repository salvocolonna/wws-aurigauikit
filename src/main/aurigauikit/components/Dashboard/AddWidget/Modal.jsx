import React from "react"
import { FormattedMessage as Msg, injectIntl } from "react-intl"
import Modal from "aurigauikit/components/Modal"
import Select2 from "aurigauikit/components/Select2"
import { Grid, Div } from "aurigauikit/components/Grid"
import messages from "./messages"

const newId = { id: "dashboard-page.add-widget.new" }

export default injectIntl(
  class extends React.Component {
    state = { selectedWidget: this.props.widgets[0] }

    changeWidget = selectedWidget => {
      const { intl } = this.props
      return selectedWidget.name === intl.formatMessage(newId)
        ? this.setState({ selectedWidget: { name: intl.formatMessage(newId) } })
        : this.setState({ selectedWidget })
    }

    confirm = () => {
      const { onAdd } = this.props
      const { selectedWidget } = this.state
      onAdd(selectedWidget)
    }

    getWidgets = () => {
      const { widgets, onBuild, intl } = this.props
      const widgetList = widgets.filter(({ name }) => name !== "active-assets")
      return onBuild ? [...widgetList, { name: intl.formatMessage(newId) }] : widgetList
    }

    render() {
      const { onClose, messages: widgetsMessages, intl } = this.props
      const { selectedWidget } = this.state
      return (
        <Modal show onClose={() => onClose()} style={{ width: "70%" }}>
          <Modal.Header title={<Msg {...messages.modal.title} />} />
          <Modal.Content>
            <Grid padding={20}>
              <Div col="1-2">
                <Select2
                  style={{ width: "100%" }}
                  data={this.getWidgets()}
                  value={selectedWidget}
                  didSelect={this.changeWidget}
                  willDisplay={({ name }) =>
                    widgetsMessages
                      ? widgetsMessages[name]
                        ? intl.formatMessage(widgetsMessages[name])
                        : name
                      : name
                  }
                />
              </Div>
            </Grid>
            {selectedWidget.name === intl.formatMessage(newId) ? (
              <this.props.onBuild />
            ) : (
              <div
                style={{
                  height: 500,
                  marginTop: 20,
                  marginBottom: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                {selectedWidget.widget}
              </div>
            )}
          </Modal.Content>
          <Modal.Footer>
            <div
              className="btn-group"
              style={{
                visibility: selectedWidget.name === intl.formatMessage(newId) ? "hidden" : "visible"
              }}>
              <button
                className="btn btn-warning-outline"
                style={{ marginRight: "20px" }}
                onClick={() => onClose()}>
                <Msg {...messages.modal.cancel} />
              </button>
              <button className="btn btn-confirmatory" onClick={this.confirm}>
                <Msg {...messages.modal.confirm} />
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )
    }
  }
)
