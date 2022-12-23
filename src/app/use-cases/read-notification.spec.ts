import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { ReadNotification } from "./read-notification";
import { makeNotification } from "@test/factories/notification-factory";
import { Notification } from "@app/entities/notification";

describe('Read notification', () => {
  it('Should be able to read a notification', async () => {
    const repo = new InMemoryNotificationsRepository();
    const read = new ReadNotification(repo);

    const notification: Notification | null = makeNotification();

    await repo.create(notification);

    await read.execute({
      notificationId: notification.id
    })
    const result = await repo.findById(notification.id);
    expect(result?.readAt).toBeTruthy();
  })
})