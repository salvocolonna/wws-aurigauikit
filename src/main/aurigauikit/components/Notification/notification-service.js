import Ajax from "aurigauikit/ajax"
class NotificationService {
  constructor(frontend, backend) {
    this.ajax = Ajax(frontend)(backend)
  }

  fetchNotification = () => {
    return this.ajax.get("notification")
  }

  readOrUnreadNotification = (notificationId, read) => {
    return this.ajax.put(`notification/${notificationId}/${read ? "read" : "unread"}`)
  }

  deleteNotification = notificationId => {
    return this.ajax.delete(`notification/${notificationId}`)
  }
}

export default NotificationService
