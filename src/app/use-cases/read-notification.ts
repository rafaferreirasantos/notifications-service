import { NotificationsRepository } from "@app/repositories/notifications-repository";
import { Injectable } from "@nestjs/common/decorators";

interface ReadNotificationRequest {
  notificationId: string
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private repo: NotificationsRepository) { }

  async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.repo.findById(notificationId);
    if (!notification) return
    notification.read();
    this.repo.save(notification)
  }
}