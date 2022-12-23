import { Notification } from "@app/entities/notification";
import { Content } from "@app/entities/notification-contenxt";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notifications";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const repoTest = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(repoTest);
    const notification = makeNotification();
    await repoTest.create(notification)
    await cancelNotification.execute({
      notificationId: notification.id
    })
    expect(repoTest.notifications.find(n => n.id == notification.id)?.canceledAt).toEqual(
      expect.any(Date)
    )
  })
  it('should not be able to cancel a non existing notification', async () => {
    const repoTest = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(repoTest);

    expect(() => {
      return cancelNotification.execute({
        notificationId: "non-existing-notification"
      })
    }).rejects.toThrow(NotificationNotFound)
  })
});