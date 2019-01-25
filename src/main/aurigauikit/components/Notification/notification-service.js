// @flow
import Ajax from "aurigauikit/ajax"

type Notification = {
  id: number,
  type: string,
  refDate: number,
  message: string,
  ref: string,
  read: boolean
}

class NotificationService {
  constructor(frontend, backend) {
    this.ajax = Ajax(frontend)(backend)
  }

  fetchNotification = (): Notification[] => {
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
