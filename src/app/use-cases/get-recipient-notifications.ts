import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notifications-repository"
import { Injectable } from "@nestjs/common";

interface GetRecipientNotificationsRequest {
  recipientId: string;
}
interface GetRecipientNotificationsResponse {
  notifications: Notification[]
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private repo: NotificationsRepository) { }

  async execute(request: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications: Notification[] = await this.repo.findManyByRecipientId(recipientId);
    return {
      notifications,
    }
  }
}