import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@app/repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface CancelNotificationRequest {
  notificationId: string;
}
type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private repo: NotificationsRepository) { }

  async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const { notificationId } = request
    const notification = await this.repo.findById(notificationId);
    if (!notification) throw new NotificationNotFound(notificationId)
    notification.cancel();
    await this.repo.save(notification);
  }
}