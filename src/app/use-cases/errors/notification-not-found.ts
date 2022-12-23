export class NotificationNotFound extends Error {
  constructor(notificationId: string) {
    super(`Notification not found. Id: ${notificationId}`)
  }
}