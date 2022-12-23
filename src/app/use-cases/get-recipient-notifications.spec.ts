import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";
import { Content } from "@app/entities/notification-contenxt";

describe('Get recipient notifications', () => {
  it('should be able to get all notifications of a recipient', async () => {
    const repo = new InMemoryNotificationsRepository();
    const getRecipient = new GetRecipientNotifications(repo);

    repo.create(makeNotification({ recipientId: 'rafael-santos' }))
    repo.create(makeNotification({ recipientId: 'rafael-santos', content: new Content('Você ganhou um prêmio!') }))
    repo.create(makeNotification({ recipientId: 'ricardo-santos' }))

    const { notifications } = await getRecipient.execute({
      recipientId: 'rafael-santos'
    });

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'rafael-santos' }),
      expect.objectContaining({ recipientId: 'rafael-santos' })
    ]))
  })
})