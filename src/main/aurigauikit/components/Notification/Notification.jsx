import React from 'react'
import Websocket from 'react-websocket'
import { FormattedMessage } from 'react-intl'
import { Pagination } from 'aurigauikit/components/SimpleTable'
import NotificationService2 from './notification-service-new'
import { withRouter } from 'react-router-dom'
import styles from './style.less'
import Popover from 'aurigauikit/components/Popover'

const getURL = (
  { hostname = location.hostname, port = 8080, ['context-path']: contextPath = '' },
  userCode,
  appCode
) =>
  `ws://${hostname}:${port}${contextPath}/api/v1/notification/socket/${appCode}/${userCode
    .split(' ')
    .join('')}`

@withRouter
class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      unreadCount: 0,
      notifications: [],
      page: 1,
      position: null,
    }
    this.service = new NotificationService2(props.frontend, props.backend)
  }

  connectionOpen = async () => {
    const notifications = await this.service.fetchNotification(
      this.props.appCode,
      this.props.userCode
    )
    const unreadCount = notifications.reduce((c, obj) => (!obj.read ? c + 1 : c), 0)
    this.setState({
      active: true,
      unreadCount,
      notifications,
    })
  }

  connectionClose = () => {
    this.setState({ active: false })
  }

  componentDidCatch() {
    this.setState({ error: true }, () => {
      setTimeout(() => this.setState({ error: false }), 5000)
    })
  }

  handleNotification = data => {
    this.setState(prevState => ({
      active: true,
      unreadCount: prevState.unreadCount + 1,
      notifications: [JSON.parse(data), ...prevState.notifications],
    }))
  }

  getTotalPages = () => {
    const { pageSize = 6 } = this.props
    const elements = this.state.notifications.length
    return Math.floor(elements / pageSize + (elements % pageSize > 0 ? 1 : 0))
  }

  onPageChange = page => {
    this.setState({
      page,
    })
  }

  readOrUnreadNotification = async notification => {
    notification.read = !notification.read
    await this.service.readOrUnreadNotification(notification.id, notification.read)
    this.setState(prevState => ({
      unreadCount: prevState.unreadCount + (notification.read ? -1 : 1),
    }))
  }

  readNotification = async notification => {
    notification.read = true
    await this.service.readOrUnreadNotification(notification.id, true)
    this.setState(
      prevState => ({
        unreadCount: prevState.unreadCount - 1,
        position: null,
      }),
      () => this.props.history.push(notification.reference)
    )
  }

  deleteNotification = async notification => {
    await this.service.deleteNotification(notification.id)
    this.setState(
      prevState => ({
        unreadCount: prevState.unreadCount - (!notification.read ? 1 : 0),
        notifications: prevState.notifications.filter(n => n.id !== notification.id),
      }),
      () => {
        this.forceUpdate()
      }
    )
  }

  openPopover = position => {
    this.setState({ position })
  }

  closePopover = () => this.setState({ position: null })

  render() {
    if (this.state.error)
      return (
        <div style={{ display: 'inline-block' }}>
          <span style={{ color: 'white' }}>
            <i className="fa fa-bell-slash" style={{ marginLeft: 9 }} />
          </span>
        </div>
      )
    const { userCode, appCode, backend, customUrl } = this.props
    const pageSize = 6
    const { notifications, page, position } = this.state
    const unreadCount = notifications.filter(n => !n.read).length
    let webSocketUrl =
      backend === 'string'
        ? `/${backend}/api/v1/notification/${userCode}`
        : getURL(backend, userCode, appCode)
    if (customUrl) webSocketUrl = customUrl
    const openPopover = e => this.openPopover({ left: e.pageX, top: e.pageY + 15 })
    const content = (
      <React.Fragment>
        {notifications && notifications.length > 0 && (
          <div style={{ pointerEvents: 'auto', width: 350 }}>
            <ul className="Notification--ul">
              {notifications.slice(pageSize * (page - 1), pageSize * page).map(notification => {
                return (
                  <li
                    key={notification.id}
                    className="Notification--li"
                    onClick={() => this.readNotification(notification)}>
                    <i
                      className={`fa fa-circle greater-feedback Notification--check`}
                      style={{
                        color: notification.read ? '#ccc' : '#2984C5',
                        textShadow: notification.read ? null : '0px 0px 10px #2984C5',
                      }}
                      onClick={e => {
                        e.stopPropagation()
                        this.readOrUnreadNotification(notification)
                      }}
                    />
                    <div
                      className="Notification--content"
                      style={{
                        fontWeight: notification.read ? 'normal' : 'bold',
                      }}>
                      {notification.message}
                    </div>
                    <i
                      className={`fa fa-times greater-feedback Notification--delete`}
                      onClick={e => {
                        e.stopPropagation()
                        this.deleteNotification(notification)
                      }}
                    />
                  </li>
                )
              })}
            </ul>
            {notifications.length > pageSize && (
              <div
                style={{
                  padding: 15,
                  paddingBottom: 10,
                  paddingTop: 0,
                }}>
                <Pagination
                  page={page}
                  totalPages={this.getTotalPages()}
                  onPageChange={this.onPageChange}
                />
              </div>
            )}
          </div>
        )}
        {!notifications ||
          (notifications.length === 0 && (
            <div
              style={{
                pointerEvents: 'auto',
                fontWeight: 600,
                fontSize: 16,
                padding: 15,
                width: 160,
                color: 'rgb(233, 128, 54)',
              }}>
              <FormattedMessage id="notification.emptyList" />
            </div>
          ))}
      </React.Fragment>
    )
    return (
      <div style={{ display: 'inline-block' }}>
        <span
          onClick={openPopover}
          style={{
            color: unreadCount > 0 ? '#2984C5' : 'white',
            textShadow: unreadCount > 0 ? '0px 0px 10px #2984C5' : null,
            cursor: 'pointer',
          }}>
          <i className="fa fa-bell" style={{ marginLeft: 9 }} />
          <span
            style={{
              color: unreadCount > 0 ? 'white' : 'white',
              textShadow: unreadCount > 0 ? '0px 0px 10px white' : null,
              fontWeight: 'bold',
              cursor: 'pointer',
              position: 'absolute',
              transform: 'translateX(-29px) translateY(-5px)',
            }}>
            {unreadCount > 0 && unreadCount}
          </span>
        </span>
        <Popover key="popover" position={position} onClose={this.closePopover}>
          {content}
        </Popover>
        <div style={{ display: 'none' }}>
          <Websocket
            url={webSocketUrl}
            onMessage={this.handleNotification}
            onOpen={this.connectionOpen}
            onClose={this.connectionClose}
          />
        </div>
      </div>
    )
  }
}

export default Notification
