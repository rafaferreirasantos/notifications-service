import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";

describe('Count recipients notifications', () => {
  it('shoud be able to ', async () => {
    const repo = new InMemoryNotificationsRepository();
    const countNotification = new CountRecipientNotifications(repo);

    await repo.create(makeNotification({ recipientId: 'example-recipient-id-A' }));
    await repo.create(makeNotification({ recipientId: 'example-recipient-id-A' }));
    await repo.create(makeNotification({ recipientId: 'example-recipient-id-B' }));

    const { count } = await countNotification.execute({
      recipientId: 'example-recipient-id-A'
    })

    expect(count).toEqual(2);
  })
})