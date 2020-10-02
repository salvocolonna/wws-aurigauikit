import React from 'react'
import Modal from 'aurigauikit/components/Modal'
import Loader from 'aurigauikit/components/Loader'
import { FormattedMessage } from 'react-intl'

const UncontrolledCard = props => {
  const [collapsed, setCollapsed] = React.useState(props.defaultOpen ? false : true)

  return (
    <Card
      {...props}
      collapsed={props.controlled ? props.collapsed : collapsed}
      onHeaderClick={() => {
        if (props.onHeaderClick) props.onHeaderClick()
        if (!props.controlled) setCollapsed(!collapsed)
      }}
    />
  )
}

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modal: false }
  }

  onClick() {
    if (!this.props.collapsable) this.callAction()
  }

  callAction(e) {
    if (e) e.preventDefault()
    if (this.props.action) this.props.action()
    else if (this.props.fullscreen) this.setState({ modal: true }, this.modalChanged)
  }

  modalChanged = () => this.props.onModalChange && this.props.onModalChange(this.state.modal)

  onModalClose() {
    this.setState({ modal: false }, this.modalChanged)
  }

  static defaultProps = { fullscreen: true }

  render() {
    const {
      children,
      header,
      title,
      action,
      className,
      onClick,
      onHeaderClick,
      fullscreenIcon = 'fa-external-link',
      fullscreen,
      collapsable,
      loading,
      mode = 'primary',
      bordered = true,
      fullscreenContent,
      fullscreenStyle: { content: fullscreenContentStyle, ...fullscreenStyle } = {},
    } = this.props

    const legacy = !window.ANT_LAYOUT

    let { style } = this.props

    if (collapsable && this.props.collapsed) style = { ...style, height: 40, paddingBottom: 50 }
    const isAction = fullscreen || action
    const onlyAction = (fullscreen || action) && !collapsable
    return (
      <div
        style={{
          border: !bordered ? '0' : undefined,
          boxShadow: !bordered ? 'none' : undefined,
          ...style,
        }}
        className={[
          legacy ? 'react-card legacy' : 'react-card',
          mode,
          className,
          collapsable && 'collapsable',
        ].join(' ')}
        onClick={e => (onClick ? onClick(e) : '')}
      >
        {header ? (
          <>{header}</>
        ) : (
          <>
            {title && (
              <div
                className="header"
                onClick={() => {
                  this.onClick()
                  onHeaderClick()
                }}
              >
                <div
                  className={`title ${onlyAction ? 'only-action' : isAction ? 'action' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <h4 style={{ position: 'relative' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        height: '100%',
                      }}
                    >
                      {collapsable && !loading && (
                        <i
                          className={`fa fa-angle-${this.props.collapsed ? 'right' : 'down'}`}
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: -2,
                          }}
                        />
                      )}
                      {title}
                    </div>
                    {isAction && !loading && (
                      <i
                        className={
                          `fa ${fullscreenIcon} ` + (onlyAction ? 'hoverable-on-title' : '')
                        }
                        onClick={e => (!onlyAction ? this.callAction(e) : '')}
                      />
                    )}
                    {loading && (
                      <Loader
                        legacy
                        style={{ marginRight: 15, marginTop: collapsable ? 5 : undefined }}
                      />
                    )}
                  </h4>
                </div>
              </div>
            )}
          </>
        )}
        {(!collapsable || (collapsable && !this.props.collapsed)) && (
          <CardContent title={title} onClick={() => this.onClick()}>
            {children}
          </CardContent>
        )}
        <Modal
          show={this.state.modal}
          style={{ width: 'calc(70%)', ...fullscreenStyle }}
          onClose={() => this.onModalClose()}
        >
          <Modal.Header title={title} />
          <Modal.Content style={fullscreenContentStyle}>
            <CardContent title={title} onClick={() => this.onClick()}>
              {fullscreenContent || children}
            </CardContent>
          </Modal.Content>
          <Modal.Footer>
            <FooterButtons>
              <CloseButton onClick={() => this.onModalClose()} />
            </FooterButtons>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const FooterButtons = ({ children }) => <div className="btn-group"> {children} </div>

const CloseButton = ({ onClick }) => (
  <button className="btn btn-primary-outline" onClick={() => onClick()}>
    {/*<FormattedMessage id='organizational-unit-modal.select' />*/}
    <FormattedMessage id="card.fullscreen.close-button" />
  </button>
)
const CardContent = ({ children, title }) => (
  <div className="content" style={{ height: !title ? '100%' : undefined }}>
    {children}
  </div>
)

export default UncontrolledCard
