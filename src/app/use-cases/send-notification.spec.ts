import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { SendNotification } from "./send-notification";

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const repoTest = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(repoTest);
    await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id'
    })
    expect(repoTest.notifications).toHaveLength(1);
  })
});