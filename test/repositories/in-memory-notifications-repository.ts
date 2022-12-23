import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entities/notification";
import { NotificationsRepository as NotificationsRepository } from "@app/repositories/notifications-repository";

@Injectable()
export class InMemoryNotificationsRepository implements NotificationsRepository {

  public notifications: Notification[] = [];
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(n => n.recipientId === recipientId).length
  }
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (!notification) return null;
    return notification;
  }
  async create(notification: Notification) {
    this.notifications.push(notification);
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(n => n.id === notification.id);
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(n => n.recipientId === recipientId)
  }
}