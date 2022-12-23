import { NotificationsRepository } from "@app/repositories/notifications-repository";
import { Injectable } from "@nestjs/common";

interface UnreadNotificationRequest {
  notificationId: string
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private repo: NotificationsRepository) { }

  async execute(request: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.repo.findById(notificationId);
    if (!notification) return
    notification.unread();
    this.repo.save(notification)
  }
}