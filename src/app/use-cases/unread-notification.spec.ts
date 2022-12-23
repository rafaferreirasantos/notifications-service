import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { makeNotification } from "@test/factories/notification-factory";
import { Notification } from "@app/entities/notification";
import { UnreadNotification } from "./unread-notificaion";

describe('Unread notification', () => {
  it('Should be able to unread a notification', async () => {
    const repo = new InMemoryNotificationsRepository();
    const unread = new UnreadNotification(repo);

    const notification: Notification | null = makeNotification({ readAt: new Date() });

    await repo.create(notification);

    await unread.execute({
      notificationId: notification.id
    })
    const result = await repo.findById(notification.id);
    expect(result?.readAt).toBeFalsy();
  })
})