import { Notification } from "@app/entities/notification";
import { Content } from "@app/entities/notification-contenxt";
import { Notification as RawNotification } from "@prisma/client"

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAd: notification.createdAt,
      canceledAt: notification.canceledAt
    }

  }
  static toDomain(raw: RawNotification): Notification {
    return new Notification({
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAd,
      readAt: raw.readAt
    }, raw.id)
  }
}