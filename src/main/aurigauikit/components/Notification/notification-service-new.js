import Ajax from "aurigauikit/ajax"

class NotificationService2 {
  constructor(frontend, backend) {
    this.ajax = Ajax(frontend)(backend)
  }

  fetchNotification = async (app, user) => {
    const result = await this.ajax.get(`notification/${app}/${user.split(" ").join("")}`)
    return result.notifications
  }

  readOrUnreadNotification = (notificationId, read) => {
    return this.ajax.put(`notification/${read ? "read" : "unread"}/${notificationId}`)
  }

  deleteNotification = notificationId => {
    return this.ajax.delete(`notification/${notificationId}`)
  }
}

export default NotificationService2
