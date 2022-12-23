import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entities/notification";
import { Content } from "@app/entities/notification-contenxt";
import { NotificationsRepository } from "@app/repositories/notifications-repository";

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}
interface SendNotificationResponse {
  notification: Notification
}

@Injectable()
export class SendNotification {
  constructor(private repo: NotificationsRepository) { }

  async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category
    })

    // Persistir notificação
    await this.repo.create(notification);

    return {
      notification,
    }
  }
}